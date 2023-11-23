<script setup>
defineProps({ attraction: Object });

import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attraction.js";
// const { kakao } = window;
const attractionStore = useAttractionStore();
const { isDetailOpen, attractionDetail } = storeToRefs(attractionStore);

const onClickCard = () => {
    isDetailOpen.value = true;
};
</script>

<template>
    <div>
        <hr class="solid" />
        <q-card
            class="my-card mx-4 my-4 p-3 rounded"
            @click="
                onClickCard();
                attractionDetail = attraction;
            "
        >
            <q-img
                class="rounded card-image"
                :src="
                    attraction.firstImage
                        ? attraction.firstImage
                        : `src/assets/img/illustrations/illustration-signin.jpg`
                "
            >
                <div class="absolute-bottom text-h6">
                    <b>{{ attraction.title }}</b>
                </div>
            </q-img>
            <div class="m-2 block">
                <div>{{ attraction.addr1 }} <br /></div>
                <hr class="m-1" />
                <div><b>조회수</b> {{ attraction.readcount }}<br /></div>
                <hr class="m-1" />
                <div class="truncate">
                    {{ attraction.description.overview }}
                </div>
            </div>
        </q-card>
    </div>
</template>

<style scoped>
.card-image {
    width: 407px;
    max-height: 200px;
}

.my-card {
    width: 440px;
    max-height: 500px;
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
    background: linear-gradient(transparent 300px, white);
}
</style>
