<script setup>
import { ref, onMounted } from "vue";
import VSelect from "@/components/common/VSelect.vue";
import BoardListItem from "@/components/board/item/BoardListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board.js";

const board = useBoardStore();
const { articleList, articleCount } = storeToRefs(board);
const { getArticleList, getArticleCount } = board;
const currentPage = ref(1);
const totalPage = ref(0);
// parmater that uses at Parameter Value
const listParameter = ref({
    pgno: currentPage.value,
    key: "",
    word: "",
});
onMounted(async () => {
    await getArticleList(listParameter);
    await getArticleCount(listParameter);
    console.log(articleList.value);
    console.log(articleCount.value);
    totalPage.value = articleCount.value;
    console.log("start");
});

// search Select Option
const selectOption = ref([
    { text: "검색조건", value: "" },
    { text: "글번호", value: "article_no" },
    { text: "제목", value: "subject" },
    { text: "작성자아이디", value: "member_id" },
]);

// change search value key
const changeKey = (val) => {
    console.log("BoarList에서 선택한 조건 : " + val);
    listParameter.value.key = val;
};

// get Article List using paramter Values
// const getArticleList = () => {
//     axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
//     axios
//         .get(
//             `/api/enjoytrip/board/list?pgno=${listParameter.value.pgno}&key=${listParameter.value.key}&word=${listParameter.value.word}`
//         )
//         .then((res) => {
//             articleList.value = res.data;
//             console.log(articleList.value);
//         });
//     axios
//         .get(
//             `/api/enjoytrip/board/list-count?pgno=${listParameter.value.pgno}&key=${listParameter.value.key}&word=${listParameter.value.word}`
//         )
//         .then((res) => {
//             totalPage.value = Math.ceil(res.data / listSize);
//             console.log("res : ", res.data);
//             console.log("pages : ", totalPage.value);
//         });
// };

// pageChange
const onPageChange = (val) => {
    console.log(val + "번 페이지로 이동 준비 끝!!!");
    listParameter.value.pgno = val;
    currentPage.value = val;
    getArticleList(listParameter);
};

const search = async () => {
    listParameter.value.pgno = 1;
    await getArticleList(listParameter);
    await getArticleCount(listParameter);
    totalPage.value = articleCount.value;
};

const moveWrite = () => {
    router.push({name :"article-write"});
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글목록</mark>
                </h2>
            </div>
            <div class="col-lg-10">
                <div class="row align-self-center mb-2">
                    <div class="col-md-2 text-start">
                        <button
                            type="button"
                            class="btn btn-outline-primary btn-sm"
                            @click="moveWrite"
                        >
                            글쓰기
                        </button>
                    </div>
                    <div class="col-md-5 offset-5">
                        <form class="d-flex">
                            <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
                            <div class="input-group input-group-sm">
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="listParameter.word"
                                    placeholder="검색어..."
                                />
                                <button class="btn btn-dark" type="button" @click="search">
                                    검색
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BoardListItem
                            v-for="article in articleList"
                            :key="article.articleNo"
                            :article="article"
                        ></BoardListItem>
                        <!-- <p
                            v-for="article in articleList"
                            :key="article.articleNo"
                            :article="article"
                        >
                            {{ article.articleNo }}
                        </p> -->
                    </tbody>
                </table>
            </div>
            <PageNavigation
                :current-page="currentPage"
                :total-page="totalPage"
                @pageChange="onPageChange"
            ></PageNavigation>
        </div>
    </div>
</template>

<style scoped></style>
