<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import axios from "axios";

const articleno = useRoute().params.articleno;

const article = ref({});

console.log(article);

onMounted(() => {
    getArticle();
});

// get article detail
const getArticle = () => {
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    axios.get(`/api/enjoytrip/board/view/${articleno}`).then((res) => {
        article.value = res.data;
        console.log(res);
        console.log(article.value);
    });
};

// go back to list view
const moveList = () => {
    router.push("/board/list");
};

// go to modify(edit view)
const moveModify = () => {
    router.push("/board/modify/" + articleno);
};

// delete article
function onDeleteArticle() {
    axios.delete(`/api/enjoytrip/board/delete`, { params: { articleNo: Number(articleno) } });
    console.log(articleno + "번글 삭제하러 가자!!!");
    moveList();
}
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
                    <h2 class="text-secondary px-5">
                        {{ article.articleNo }}. {{ article.subject }}
                    </h2>
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
                    <div class="divider mb-3"></div>
                    <div class="text-secondary">
                        {{ article.content }}
                    </div>
                    <div class="divider mt-3 mb-3"></div>
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
