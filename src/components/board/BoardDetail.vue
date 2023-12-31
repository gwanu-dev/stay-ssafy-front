<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import BoardDetailMemo from "@/components/board/item/BoardDetailMemo.vue";
import { storeToRefs } from "pinia";
import { useLikeAxiosStore } from "@/api/like.js";
import { useBoardStore } from "@/stores/board.js";
import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";

const board = useBoardStore();
const { article } = storeToRefs(board);
const { getArticleDetail, deleteArticle } = board;

const articleno = useRoute().params.articleno;
const likeAxios = useLikeAxiosStore();

const { registLike, deleteLike, confirmLike } = likeAxios;
console.log(article);

const sortedMemo = ref([]);
const memoCount = ref(0);

const isLiked = ref(false);
let token = sessionStorage.getItem("accessToken");
let decodeToken;
let id;

onMounted(async () => {
    await getArticleDetail(articleno);
    console.log("[BoardDetail] article : ", article.value);
    article.value.memos.forEach((e) => {
        if (e.superComment === null) {
            sortedMemo.value.push(e);
        } else {
            for (let k = 0; k < sortedMemo.value.length; k++) {
                if (e.superComment.memoNo === sortedMemo.value[k].memoNo) {
                    sortedMemo.value.splice(k + 1, 0, e);
                    break;
                }
            }
        }
    });
    console.log(sortedMemo);
    console.log(sortedMemo.value.length);
    if (sortedMemo.value != null) memoCount.value = sortedMemo.value.length;
    else {
        memoCount.value = 0;
    }
    if (token) {
        decodeToken = jwtDecode(token);
        id = decodeToken.userId;
        let res = await confirmLike(article.value.articleNo, id);
        if (res.status === HttpStatusCode.Ok) {
            isLiked.value = true;
            article.value.likeCount -= 1;
        }
    }
});

// go back to list view
const moveList = () => {
    router.push("/board/list");
};

// go to modify(edit view)
const moveModify = () => {
    router.push({
        name: "article-modify",
        state: {
            modify: true,
            articleno: articleno,
        },
    });
};

// delete article
const onDeleteArticle = async () => {
    await deleteArticle(articleno);
    console.log(articleno + "번글 삭제하러 가자!!!");
    moveList();
};

// click toggle method
const onLikeClick = async () => {
    console.log("like Clicked!", article);
    if (isLiked.value) {
        await deleteLike(articleno, id);
    } else {
        await registLike(articleno, id);
    }
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 text-start">
                <div class="row my-2">
                    <b>{{ article.articleNo }} 번째 글</b>
                    <h4 class="text-secondary px-3">
                        {{ article.subject }}
                    </h4>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="clearfix align-content-center">
                            <img
                                class="avatar me-2 float-md-start bg-light p-2"
                                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                            />
                            <p>
                                <span class="fw-bold">{{ article.memberName }}</span> ({{
                                    article.memberId
                                }})<br />
                                <span class="text-secondary fw-light">
                                    조회 : {{ article.hit }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 align-self-center justify-self-center text-end">
                        <div>댓글 : {{ memoCount }} 개</div>
                        <div class="text-muted">
                            {{ article.registerTime }}
                        </div>
                    </div>

                    <!-- 본문 부분 -->

                    <hr class="divider mb-3" />
                    <div class="my-4">
                        {{ article.content }}
                    </div>

                    <!-- 좋아요 부분 -->

                    <div class="text-secondary my-3 flex justify-content-center">
                        <div class="q-pa-md">
                            <input
                                type="checkbox"
                                class="btn-check"
                                id="btn-check-outlined"
                                autocomplete="off"
                                v-model="isLiked"
                                @click="onLikeClick"
                            />
                            <label
                                class="btn btn-outline-warning"
                                for="btn-check-outlined"
                                style="font-size: 17Spx"
                            >
                                <v-icon v-show="!isLiked" name="bi-heart" />
                                <v-icon v-show="isLiked" name="bi-heart-fill" />
                                좋아요 {{ article.likeCount + (isLiked ? 1 : 0) }}
                            </label>
                        </div>
                    </div>

                    <hr class="divider mt-3 mb-3" />

                    <!-- 메모 부분 -->

                    <div>
                        <BoardDetailMemo :articleno="articleno" :sortedmemo="sortedMemo" />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button
                            type="button"
                            class="btn btn-outline-primary mb-3"
                            @click="moveList"
                        >
                            글목록
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-success mb-3 ms-1"
                            @click="moveModify"
                        >
                            글수정
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-danger mb-3 ms-1"
                            @click="onDeleteArticle"
                        >
                            글삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
