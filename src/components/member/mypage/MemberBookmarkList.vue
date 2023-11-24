<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member.js";
import { useMypageStore } from "@/stores/mypage.js";
import MemberAttractionItem from "@/components/member/mypage/MemberAttractionItem.vue";

const memberStore = useMemberStore();
const mypageStore = useMypageStore();

const { member } = storeToRefs(memberStore);
const { bookmarkList } = storeToRefs(mypageStore);

const { getMember } = memberStore;
const { getBookmarkListByMemberId } = mypageStore;

onMounted(async () => {
    await getMember(sessionStorage.getItem("accessToken"));
    await getBookmarkListByMemberId(member.value.memberId);

    console.log(bookmarkList.value);
});

const isDetailOpen = ref(false);
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-left text-secondary">
                <h4>북마크 한 관광지</h4>
            </div>
            <hr class="hr hr-4 m-3" />
            <div class="col-lg-12">
                <div v-show="!isDetailOpen" class="row">
                    <div
                        class="col-4 justify-contents-center"
                        v-for="attraction in bookmarkList"
                        :key="attraction.contentId"
                    >
                        <MemberAttractionItem :attraction="attraction" />
                    </div>
                </div>

                <div v-if="isDetailOpen" class="">
                    <div>
                        <MapDetailItem></MapDetailItem>
                    </div>
                </div>
            </div>
            <!-- <PageNavigation
                :current-page="currentPage"
                :total-page="totalPage"
                @pageChange="onPageChange"
            ></PageNavigation> -->
        </div>
    </div>
</template>

<style scoped></style>
