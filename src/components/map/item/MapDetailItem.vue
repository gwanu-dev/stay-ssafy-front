<script setup>
import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attraction.js";
// const { kakao } = window;
const attractionStore = useAttractionStore();
const { isDetailOpen, attractionDetail } = storeToRefs(attractionStore);
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
            <div><b>조회수</b> {{ attractionDetail.readcount }}<br /></div>
            <hr class="m-1" />
            <div class="">
                {{ attractionDetail.description.overview }}
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
</style>
