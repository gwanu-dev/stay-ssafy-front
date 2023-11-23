<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

import router from "@/router";

import { useBoardStore } from "@/stores/board.js";
const board = useBoardStore();
const { article } = storeToRefs(board);
import { useMemoAxiosStore } from "@/api/memo";
import { jwtDecode } from "jwt-decode";
const memoAxios = useMemoAxiosStore();
const editState = ref(false);
const editNum = ref(0);
const replyState = ref(false);
const replyNum = ref(0);

const { postMemo, postSubMemo, putMemo, deleteMemo } = memoAxios;

const props = defineProps({ articleno: String, sortedmemo: Object });

const memo = ref({
    memoNo: "",
    comment: "",
    memoTime: "",
    articleNo: "",
    memberId: "",
});

const subMemo = ref({
    memoNo: "",
    comment: "",
    memoTime: "",
    articleNo: "",
    memberId: "",
    superComment: "",
});

const sortedMemo = ref([]);
let token = sessionStorage.getItem("accessToken");
let decodeToken;
let id;

onMounted(async () => {
    console.log("memo", props.articleno);
    console.log(article.value.memos);
    if (token) {
        decodeToken = jwtDecode(token);
        id = decodeToken.userId;
    }
});

const writeMemo = async () => {
    if (memo.value.comment === "") {
        alert("댓글 내용을 작성해주세요!");
    } else {
        console.log("[article] : ", article.value);
        console.log("[writeMemo] : ", memo.value);
        memo.value.articleNo = article.value.articleNo;
        memo.value.memberId = id;
        await postMemo(memo.value);
        refresh();
    }
};

const editButtonClick = (key) => {
    console.log(key);
    replyState.value = false;
    editState.value = !editState.value;
    editNum.value = key;
};

const replyButtonClick = (key) => {
    console.log(key);
    editState.value = false;
    replyState.value = !replyState.value;
    replyNum.value = key;
};

const deleteThisMemo = async (memo) => {
    console.log("delete This Key : ", memo);
    await deleteMemo(memo);
    router.go(0);
};

const writeSubMemo = async (memo) => {
    console.log("write sub memo :", memo);
    subMemo.value.articleNo = memo.articleNo;
    subMemo.value.superComment = memo;
    subMemo.value.memberId = id;
    console.log(subMemo.value);
    await postSubMemo(memo.memoNo, subMemo.value);
    //refresh();
};

const editMemo = async (memo) => {
    console.log("edit This Key : ", memo);
    putMemo(memo);
};

const refresh = () => {
    router.go(0);
};
</script>

<template>
    <div>
        <div>
            <h6>댓글</h6>
        </div>
        <hr class="divider mt-3 mb-3" />
        <div class="row">
            <q-input outlined v-model="memo.comment" placeholder="댓글 작성" class="col" />
            <q-btn
                color="secondary"
                icon-right="send"
                label="작성하기"
                class=""
                @click="writeMemo"
            />
        </div>
        <hr class="divider mt-3 mb-3" />
        <div>
            <div v-if="!article.memos">아직 작성된 댓글이 없습니다.</div>
            <div v-else v-for="memo in sortedmemo" :key="memo.memoNo">
                <div class="row">
                    <div
                        class="col-1 justify-content-end align-items-center"
                        v-if="memo.superComment != null"
                    >
                        <v-icon name="bi-arrow-return-right"></v-icon>
                    </div>
                    <div class="col-7" :class="{ 'col-8': memo.superComment == null }">
                        <div class="d-flex flex-column">
                            <div>
                                <b>{{ memo.memberId }}</b>
                            </div>
                            <div style="font-size: 10px; color: grey">
                                {{ memo.memoTime }}
                            </div>
                            <div v-show="!editState">
                                <div v-if="memo.superComment != null" style="color: grey">
                                    @ {{ memo.superComment.memberId }}
                                </div>
                                {{ memo.comment }}
                            </div>
                        </div>
                    </div>
                    <div class="col-4 d-flex justify-content-end align-items-center">
                        <v-icon
                            class="m-1"
                            name="bi-reply-all"
                            @click="replyButtonClick(memo.memoNo)"
                        >
                        </v-icon>
                        <v-icon
                            class="m-1"
                            name="bi-pencil"
                            @click="editButtonClick(memo.memoNo)"
                        ></v-icon>
                        <v-icon
                            class="m-1"
                            name="bi-x-circle"
                            @click="deleteThisMemo(memo.memoNo)"
                        ></v-icon>
                    </div>
                    <div>
                        <div class="row" v-show="editState && editNum === memo.memoNo">
                            <q-input
                                outlined
                                v-model="memo.comment"
                                placeholder="수정하기"
                                class="col"
                            />
                            <q-btn
                                color="secondary"
                                icon-right="send"
                                label="수정하기"
                                class=""
                                @click="editMemo(memo)"
                            />
                        </div>
                    </div>
                    <div>
                        <div class="row" v-show="replyState && replyNum == memo.memoNo">
                            <hr class="divider hr-blurry" />
                            <q-input
                                outlined
                                v-model="subMemo.comment"
                                placeholder="답글 작성"
                                class="col"
                            />
                            <q-btn
                                color="secondary"
                                icon-right="send"
                                label="답글달기"
                                class=""
                                @click="writeSubMemo(memo)"
                            />
                        </div>
                    </div>
                </div>
                <hr class="divider hr-blurry" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
