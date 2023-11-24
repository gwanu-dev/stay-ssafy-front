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
const { likeList } = storeToRefs(mypage);

const { getMember } = memberStore;
const { getArticleCount } = board;
const { getLikeListByMemberId } = mypage;

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
    await getLikeListByMemberId(member.value.memberId);

    console.log(likeList.value);
    console.log(articleCount.value);

    totalPage.value = 1;
});

// pageChange
const onPageChange = (val) => {
    console.log(val + "번 페이지로 이동 준비 끝!!!");
    listParameter.value.pgno = val;
    currentPage.value = val;
    getLikeListByMemberId(member.value.memberId);
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-left text-secondary">
                <h4>좋아요 한 게시글</h4>
            </div>
            <hr class="hr hr-4 m-3" />
            <div class="col-lg-10">
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th scope="col-1">글번호</th>
                            <th scope="col-3">제목</th>
                            <th scope="col-2">작성자</th>
                            <th scope="col-1">조회수</th>
                            <th scope="col-1">댓글수</th>
                            <th scope="col-1">추천수</th>
                            <th scope="col-2">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BoardListItem
                            v-for="article in likeList"
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
