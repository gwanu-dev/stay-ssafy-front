<script setup>
import { ref, watch, onMounted } from "vue";
import { matMenu } from "@quasar/extras/material-icons";
import { storeToRefs } from "pinia";

import { useAttractionStore } from "@/stores/attraction.js";

const attractionStore = useAttractionStore();
const { searchAttractions, getSidoCode, getGugunCode, getContentType } = attractionStore;
const { attractionList, sidoCodeList, gugunCodeList, contentTypeList } =
    storeToRefs(attractionStore);

var map;
const positions = ref([]);
const markers = ref([]);

const text = ref("");
const leftDrawerOpen = ref(false);

const sidoValue = ref({
    sidoName: "선택",
    sidoCode: "0",
});
const gugunValue = ref({
    gugunName: "선택",
    gugunCode: "0",
});
const contentTypeValue = ref({
    contentTypeName: "선택",
    contentTypeId: "0",
});

const typeDto = ref({
    sido: "1",
    gugun: "1",
    contentTypeId: "12",
    keyword: "",
});

watch(sidoValue, async () => {
    console.log("sido Selected!");
    console.log(sidoValue.value);
    await getGugunCode(sidoValue.value.sidoCode);
});

const search = async () => {
    console.log(sidoValue.value);
    console.log(gugunValue.value);
    console.log(contentTypeValue.value);

    typeDto.value.sido = sidoValue.value.sidoCode;
    typeDto.value.gugun = gugunValue.value.gugunCode;
    typeDto.value.contentTypeId = contentTypeValue.value.contentTypeId;
    typeDto.value.keyword = text.value;
    await searchAttractions(typeDto.value);
    loadMarkers();
};

onMounted(async () => {
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        console.log("kakao.maps is not loaded============");
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
            import.meta.env.VITE_KAKAO_API_KEY
        }&libraries=services,clusterer`;
        /* global kakao */
        script.onload = () => window.kakao.maps.load(() => initMap());
        document.head.appendChild(script);
    }

    await getSidoCode();
    await getContentType();
});

const initMap = () => {
    const container = document.getElementById("map");
    const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
    };
    map = new window.kakao.maps.Map(container, options);
};

// watch(
//     () => props.stations.value,
//     () => {
//         positions.value = [];
//         props.stations.forEach((station) => {
//             let obj = {};
//             obj.latlng = new kakao.maps.LatLng(station.lat, station.lng);
//             obj.title = station.statNm;

//             positions.value.push(obj);
//         });
//         loadMarkers();
//     },
//     { deep: true }
// );

// watch(
//     () => props.selectStation.value,
//     () => {
//         // 이동할 위도 경도 위치를 생성합니다
//         var moveLatLon = new kakao.maps.LatLng(props.selectStation.lat, props.selectStation.lng);

//         // 지도 중심을 부드럽게 이동시킵니다
//         // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//         map.panTo(moveLatLon);
//     },
//     { deep: true }
// );

const loadMarkers = () => {
    // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
    deleteMarkers();

    // 마커 이미지를 생성합니다
    const imgSrc = "@/assets/img/logos/sketch.jpg";
    // 마커 이미지의 이미지 크기 입니다
    const imgSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
    // 마커를 생성합니다
    markers.value = [];
    attractionList.value.forEach((attraction) => {
        let latlng = [attraction.latitude, attraction.longitude];
        const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            title: attraction.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
            clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            image: markerImage, // 마커의 이미지
        });
        markers.value.push(marker);
    });

    // 4. 지도를 이동시켜주기
    // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
    // const bounds = positions.value.reduce(
    //     (bounds, position) => bounds.extend(position.latlng),
    //     new kakao.maps.LatLngBounds()
    // // );

    // map.setBounds(bounds);
};

const deleteMarkers = () => {
    if (markers.value.length > 0) {
        markers.value.forEach((marker) => marker.setMap(null));
    }
};
</script>

<template>
    <q-layout view="lHh lpR lFf" id="q-layout">
        <q-header elevated height-hint="98">
            <!-- <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
            </q-toolbar> -->
            <q-page-sticky position="left" :offset="[18, 68]">
                <q-btn
                    round
                    color="primary"
                    icon="arrow_back"
                    :class="{ 'rotate-180': !leftDrawerOpen }"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
            </q-page-sticky>
        </q-header>

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
            :width="400"
        >
            <h3>Stay SSAFY</h3>
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <div class="q-pa-md" style="display: flex; align-items: center">
                    <!-- Input -->
                    <q-input v-model="text" label="Input Field" outlined dense class="main-input" />

                    <!-- Button -->
                    <q-btn @click="search" label="검색" color="primary" />
                </div>

                <div class="q-pa-md" style="display: flex; align-items: center">
                    <!-- q-select for 시도 -->
                    <div class="q-gutter-md">
                        <q-select
                            class="button-margin label-adjustment"
                            color="primary"
                            filled
                            standout
                            label="시도 선택"
                            emit-value
                            map-options
                            :options="sidoCodeList"
                            option-label="sidoName"
                            option-class="label-size"
                            v-model="sidoValue"
                        >
                            <template v-slot:no-option>
                                <q-item class="col-4">
                                    <q-item-section>
                                        <q-item-label>선택</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </div>
                    <!-- q-select for 구군 -->
                    <q-select
                        class="button-margin label-adjustment"
                        color="primary"
                        label="구군 선택"
                        filled
                        standout
                        :options="gugunCodeList"
                        option-label="gugunName"
                        v-model="gugunValue"
                        item-aligned
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section>
                                    <q-item-label>선택</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>

                    <!-- q-select for 타입 -->
                    <q-select
                        class="button-margin label-adjustment"
                        color="primary"
                        label="유형 선택"
                        filled
                        standout
                        :options="contentTypeList"
                        option-label="contentTypeName"
                        v-model="contentTypeValue"
                        item-aligned
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section>
                                    <q-item-label>선택</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </div>
                <div>
                    <div v-for="attraction in attractionList" :key="attraction.contentId">
                        <hr class="solid" />
                        <q-card class="my-card">
                            <q-img
                                :src="
                                    attraction.firstImage
                                        ? attraction.firstImage
                                        : `@/assets/img/illustrations/illustration-signin.jpg`
                                "
                            >
                                <div class="absolute-bottom text-h6">{{ attraction.title }}</div>
                            </q-img>
                            {{ attraction.addr1 }} <br />
                            조회수 : {{ attraction.readcount }}
                        </q-card>
                    </div>
                </div>
            </q-scroll-area>
        </q-drawer>

        <q-page-container id="q-page">
            <div id="map"></div>
        </q-page-container>
    </q-layout>
</template>

<style>
#q-layout,
#q-page,
#map {
    width: 100%;
    height: 100%;
}

div.q-pa-md {
    padding: 8px;
}
.main-input {
    width: 310px;
    margin-left: 1px; /* Adjust the width as needed */
}
.label-adjustment .q-field__label {
    font-size: 14px; /* 라벨 폰트 크기 조절 */
}

.label-adjustment .q-field__content {
    padding-top: 5px; /* 라벨과 선택된 값 사이 간격 조절 */
}
.button-margin {
    margin-right: 7px; /* 버튼 사이의 여백을 조절할 수 있는 값 */
    min-width: 130px;
    white-space: nowrap;
}
.label-size {
    min-width: 130px;
}

.q-field__label {
    min-width: 100px important!;
}
</style>
