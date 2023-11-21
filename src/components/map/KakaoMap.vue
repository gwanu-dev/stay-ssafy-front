<script setup>
import { ref, watch, onMounted } from "vue";
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
    sidoCode: "0",
});
const gugunValue = ref({
    gugunCode: "0",
});
const contentTypeValue = ref({
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
    await getGugunCode(sidoValue.value);
});

const search = async () => {
    console.log(sidoValue.value);
    console.log(gugunValue.value);
    console.log(contentTypeValue.value);

    typeDto.value.sido = sidoValue.value;
    typeDto.value.gugun = gugunValue.value;
    typeDto.value.contentTypeId = contentTypeValue.value;
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
    const imgSrc = "src/assets/img/logos/sketch.jpg";
    // 마커 이미지의 이미지 크기 입니다
    const imgSize = new window.kakao.maps.Size(24, 24);
    const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);
    // 마커를 생성합니다
    markers.value = [];
    attractionList.value.forEach((attraction) => {
        const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(attraction.latitude, attraction.longitude), // 마커를 표시할 위치
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
            :width="500"
        >
            <h3>Stay SSAFY</h3>
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <div class="mr-4">
                    <div class="q-pa-md" style="display: flex; align-items: center">
                        <!-- Input -->
                        <q-input
                            v-model="text"
                            label="Input Field"
                            outlined
                            dense
                            class="main-input"
                        />

                        <!-- Button -->
                        <q-btn @click="search" label="검색" color="primary" class="search-btn" />
                    </div>

                    <div class="" style="display: flex; align-items: center">
                        <!-- q-select for 시도 -->
                        <select
                            class="form-select form-select-lg mx-1 col"
                            aria-label=".form-select-lg example"
                            v-model="sidoValue"
                        >
                            <option
                                v-for="sidoCode in sidoCodeList"
                                :key="sidoCode.sidoCode"
                                :value="sidoCode.sidoCode"
                            >
                                {{ sidoCode.sidoName }}
                            </option>
                        </select>
                        <select
                            class="form-select form-select-lg mx-1 col"
                            aria-label=".form-select-lg example"
                            v-model="gugunValue"
                        >
                            <option
                                v-for="gugunCode in gugunCodeList"
                                :key="gugunCode.gugunCode"
                                :value="gugunCode.gugunCode"
                            >
                                {{ gugunCode.gugunName }}
                            </option>
                        </select>
                        <select
                            class="form-select form-select-lg mx-1 col"
                            aria-label=".form-select-lg example"
                            v-model="contentTypeValue"
                        >
                            <option
                                v-for="contentType in contentTypeList"
                                :key="contentType.contentTypeId"
                                :value="contentType.contentTypeId"
                            >
                                {{ contentType.contentTypeName }}
                            </option>
                        </select>

                        <!-- <q-select
                        class="col"
                        color="primary"
                        filled
                        standout
                        label="시도 선택"
                        emit-value
                        map-options
                        :options="sidoCodeList"
                        option-label="sidoName"
                        v-model="sidoValue"
                    >
                    </q-select>
                    <q-select
                        class="col"
                        color="primary"
                        label="구군 선택"
                        emit-value
                        map-options
                        filled
                        standout
                        :options="gugunCodeList"
                        option-label="gugunName"
                        v-model="gugunValue"
                    >
                    </q-select>
                    <q-select
                        class="col"
                        color="primary"
                        label="유형 선택"
                        emit-value
                        map-options
                        filled
                        standout
                        :options="contentTypeList"
                        option-label="contentTypeName"
                        v-model="contentTypeValue"
                    >
                    </q-select> -->
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
                                    <div class="absolute-bottom text-h6">
                                        {{ attraction.title }}
                                    </div>
                                </q-img>
                                {{ attraction.addr1 }} <br />
                                조회수 : {{ attraction.readcount }}
                            </q-card>
                        </div>
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

.main-input {
    width: 380px;
    margin-left: 1px;
}

.button-margin {
    white-space: nowrap;
}

.search-btn {
    width: 100px;
}
</style>
