<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attraction.js";
// const { kakao } = window;
import router from "@/router";
import { jwtDecode } from "jwt-decode";

const attractionStore = useAttractionStore();
const { isDetailOpen, attractionDetail } = storeToRefs(attractionStore);

import { registBookmark, deleteBookmark } from "@/api/bookmark.js";
let token = localStorage.getItem["accessToken"];
const link = ref(`https://search.naver.com/search.naver?query=${attractionDetail.value.title}`);
const isBookmarked = ref(false);
const onBookmarkClick = async () => {
    if (token) {
        console.log("Bookmark Clicked!", attractionDetail.value);
        let decodeToken = jwtDecode(token);
        let id = decodeToken.userId;
        if (isBookmarked.value) {
            await deleteBookmark(attractionDetail.value.contentId, id);
        } else {
            await registBookmark(attractionDetail.value.contentId, id);
        }
        isBookmarked.value = !isBookmarked.value;
    } else {
        alert("로그인해주세요!");
        router.push({ name: "member-login" });
    }
};
</script>

<template>
    <div>
        <img
            class="rounded card-image m-3"
            :src="
                attractionDetail.firstImage
                    ? attractionDetail.firstImage
                    : `src/assets/img/illustrations/illustration-signin.jpg`
            "
        />
        <div class="mb-3 mx-3 block">
            <div class="text-h6">
                <b>{{ attractionDetail.title }}</b>
            </div>
            <div>{{ attractionDetail.addr1 }} <br /></div>
            <hr class="m-1" />
            <!-- 북마크 부분 -->
            <div class="d-flex justify-content-around">
                <div><b>조회수</b> {{ attractionDetail.readcount }}<br /></div>
                <div class="">
                    <div class="text-danger" v-show="isBookmarked" @click="onBookmarkClick">
                        <v-icon name="bi-bookmark-star-fill" />
                        북마크
                    </div>
                    <div class="" v-show="!isBookmarked" @click="onBookmarkClick">
                        <v-icon name="bi-bookmark-star" />
                        북마크
                    </div>
                </div>
            </div>
            <hr class="m-1" />
            <div class="">
                {{ attractionDetail.description.overview }}
            </div>

            <hr class="mx-1 my-3" />
            <div class="d-flex justify-content-around">
                <q-btn class="foot-btn" label="네이버검색" color="secondary" :href="link" />
                <q-btn
                    class="foot-btn"
                    label="다시 검색하기"
                    color="secondary"
                    @click="isDetailOpen = false"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-image {
    width: 460px;
    max-height: 500px;
}

.my-card {
    width: 400px;
    max-height: 600px;
}

.truncate {
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.truncate:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.foot-btn {
    width: 110px;
}
</style>
