<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import BoardDetailMemo from "@/components/board/item/BoardDetailMemo.vue";
import { storeToRefs } from "pinia";
import { useLikeAxiosStore } from "@/api/like.js";
import { useBoardStore } from "@/stores/board.js";
const board = useBoardStore();
const { article } = storeToRefs(board);
const { getArticleDetail, deleteArticle } = board;

const articleno = useRoute().params.articleno;

console.log(article);

const sortedMemo = ref([]);

onMounted(async () => {
    await getArticleDetail(articleno);
    console.log("[BoardDetail] article : ", article.value);
    article.value.memos.forEach((e) => {
        if (e.superComment === null) {
            sortedMemo.value.push(e);
        } else {
            for (let k = 0; k < sortedMemo.value.length; k++) {
                if (e.superComment.memoNo === sortedMemo.value[k].memoNo) {
                    sortedMemo.value.splice(k, 0, e);
                    break;
                }
            }
        }
    });
    console.log(sortedMemo);
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

const onLikeClick = async () => {
    console.log("like Clicked!");
    isLiked.value = !isLiked.value;
};

const isLiked = ref(false);
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글보기</mark>
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <div class="row my-2">
                    <b>{{ article.articleNo }}</b>
                    <h4 class="text-secondary px-5">
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
                                <span class="fw-bold">{{ article.memberName }}</span> <br />
                                <span class="text-secondary fw-light">
                                    {{ article.registerDate }} 조회 : {{ article.hit }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
                    <hr class="divider mb-3" />
                    <div class="text-secondary my-4">
                        {{ article.content }}
                    </div>
                    <div class="text-secondary my-3 flex justify-content-center">
                        <div class="q-pa-md">
                            <input
                                type="checkbox"
                                class="btn-check"
                                id="btn-check-outlined"
                                autocomplete="off"
                                v-model="isLiked"
                                @click="isLiked = !isLiked"
                            />
                            <label
                                class="btn btn-outline-warning"
                                for="btn-check-outlined"
                                style="font-size: 17Spx"
                            >
                                <v-icon v-show="!isLiked" name="bi-heart" />
                                <v-icon v-show="isLiked" name="bi-heart-fill" />
                                좋아요 {{ article.likeCount + isLiked ? 1 : 0 }}</label
                            >
                        </div>
                    </div>
                    <hr class="divider mt-3 mb-3" />
                    <!-- 메모 -->

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
