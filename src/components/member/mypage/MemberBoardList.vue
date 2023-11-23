<script setup>
import { ref, onMounted } from "vue";
import BoardListItem from "@/components/board/item/BoardListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member.js";
import { useBoardStore } from "@/stores/board.js";
import { useMypageStore } from "@/stores/mypage.js";

const memberStore = useMemberStore();
const board = useBoardStore();
const mypage = useMypageStore();

const { member } = storeToRefs(memberStore);
const { articleCount } = storeToRefs(board);
const { memberArticleList } = storeToRefs(mypage);

const { getMember } = memberStore;
const { getArticleCount } = board;
const { getArticleListByMemberId } = mypage;

const currentPage = ref(1);
const totalPage = ref(0);

const listParameter = ref({
    pgno: currentPage.value,
    key: "",
    word: "",
});

onMounted(async () => {
    await getMember(sessionStorage.getItem("accessToken"));
    await getArticleCount(listParameter);
    await getArticleListByMemberId(member.value.memberId);

    console.log(memberArticleList.value);
    console.log(articleCount.value);

    totalPage.value = articleCount.value;
});

// pageChange
const onPageChange = (val) => {
    console.log(val + "번 페이지로 이동 준비 끝!!!");
    listParameter.value.pgno = val;
    currentPage.value = val;
    getArticleList(listParameter);
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-left text-secondary">
                <h4>내가 쓴 게시글</h4>
            </div>
            <hr class="hr hr-4 m-3" />
            <div class="col-lg-10">
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th scope="col-1">글번호</th>
                            <th scope="col-4">제목</th>
                            <th scope="col-2">작성자</th>
                            <th scope="col-1">조회수</th>
                            <th scope="col-1">댓글수</th>
                            <th scope="col-1">추천수</th>
                            <th scope="col-2">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BoardListItem
                            v-for="article in memberArticleList"
                            :key="article.articleNo"
                            :article="article"
                        ></BoardListItem>
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
