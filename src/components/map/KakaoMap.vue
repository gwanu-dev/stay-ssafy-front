<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import MapAttractionItem from "@/components/map/item/MapAttractionItem.vue";
import MapDetailItem from "@/components/map/item/MapDetailItem.vue";
import { useAttractionStore } from "@/stores/attraction.js";
import router from "@/router";
import { useMenuStore } from "@/stores/menu";

const menuStore = useMenuStore();

const { menuList, menuState } = storeToRefs(menuStore);

// const { kakao } = window;
const attractionStore = useAttractionStore();
const { searchAttractions, getSidoCode, getGugunCode, getContentType, getKakaoHotelList } =
    attractionStore;
const {
    attractionList,
    sidoCodeList,
    gugunCodeList,
    contentTypeList,
    isDetailOpen,
    attractionDetail,
} = storeToRefs(attractionStore);

var map;
const positions = ref([]);
const markers = ref([]);
const hotelMarkers = ref([]);

const inputKeyword = ref("");
const leftDrawerOpen = ref(false);

const sidoValue = ref("0");
const gugunValue = ref("0");
const contentTypeValue = ref("0");
const hotelList = ref();

const typeDto = ref({
    sido: "1",
    gugun: "1",
    contentTypeId: "1",
    keyword: "",
});

const imageSrcMapper = (contentTypeCode) => {
    if (contentTypeCode === 12) {
        return "src/assets/img/map-icons/monument.svg";
    }
    if (contentTypeCode === 14) {
        return "src/assets/img/map-icons/cableway.svg";
    }
    if (contentTypeCode === 15) {
        return "src/assets/img/map-icons/bonfire.svg";
    }
    if (contentTypeCode === 25) {
        return "src/assets/img/map-icons/course.svg";
    }
    if (contentTypeCode === 28) {
        return "src/assets/img/map-icons/boot.svg";
    }
    if (contentTypeCode === 32) {
        return "src/assets/img/map-icons/motel.svg";
    }
    if (contentTypeCode === 38) {
        return "src/assets/img/map-icons/wallet.svg";
    }
    if (contentTypeCode === 39) {
        return "src/assets/img/map-icons/restaurant.svg";
    }
};

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
    typeDto.value.keyword = inputKeyword.value;
    await searchAttractions(typeDto.value);
    loadAttractionMarkers();
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

        if (sessionStorage.getItem("accessToken")) {
            menuState.value = true;
        } else {
            menuState.value = false;
        }
        console.log(menuState);
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
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl.kakao.maps.ControlPosition.TOPRIGHT);
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
//     { deep: true }article
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

let infoWindows = [];

const loadAttractionMarkers = () => {
    // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
    deleteMarkers();
    deleteHotelMarkers();
    // 마커를 생성합니다
    markers.value = [];

    if (attractionList.value != null) {
        const moveLatLng = new kakao.maps.LatLng(
            attractionList.value[0].latitude,
            attractionList.value[0].longitude
        );
        map.panTo(moveLatLng);
    }
    attractionList.value.forEach((attraction) => {
        const imgSrc = imageSrcMapper(attraction.contentTypeId);
        const imgSize = new window.kakao.maps.Size(24, 24);
        const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);

        let iwContent = `
        <div style="container">
            <div class="font-weight-bold m-2">${attraction.title}</divs>
            <div class="text-grey font-weight-light m-1">${attraction.addr1}</div>
        </div>
        `;
        const latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);

        const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            title: attraction.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
            clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            image: markerImage, // 마커의 이미지
        });
        const infoWindow = new kakao.maps.InfoWindow({
            content: iwContent,
        });
        const infoWindow2 = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: true,
        });
        infoWindows.push(infoWindow2);

        kakao.maps.event.addListener(marker, "mouseover", () => {
            infoWindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
        });
        kakao.maps.event.addListener(marker, "click", () => {
            // if (!selectedMarker || selectedMarker !== marker) {
            //     !!selectedMarker &&

            map.panTo(latlng);
            for (let infowindowTemp of infoWindows) {
                infowindowTemp.close();
            }
            infoWindow.close();
            infoWindow2.open(map, marker);
            isDetailOpen.value = true;
            attractionDetail.value = attraction;

            // selectedMarker = marker;
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
    for (let infowindowTemp of infoWindows) {
        infowindowTemp.close();
    }
};

const deleteHotelMarkers = () => {
    if (hotelMarkers.value.length > 0) {
        hotelMarkers.value.forEach((marker) => marker.setMap(null));
    }
    for (let infoHotelWindow of infoHotelWindows) {
        infoHotelWindow.close();
    }
};

const getHotelList = async () => {
    let center = map.getCenter();
    hotelList.value = await getKakaoHotelList(center);
    console.log(hotelList.value);

    loadHotelMarker();
};

let infoHotelWindows = [];

const logoClick = () => {
    router.push({ name: "main" });
};

const loadHotelMarker = () => {
    deleteHotelMarkers();
    hotelMarkers.value = [];

    hotelList.value.forEach((hotel) => {
        const imgSrc = "src/assets/img/map-icons/hotel.svg";
        const imgSize = new window.kakao.maps.Size(24, 24);
        const markerImage = new window.kakao.maps.MarkerImage(imgSrc, imgSize);
        let iwContent =
            `
        <div class="container m-2 p-1 info-window">
            <div class="font-weight-bold m-1"><h6>${hotel.placeName}</h6></div>
            <div>
                분류 > <b class="text-grey font-weight-light m-1"> ${hotel.categoryName.replace(
                    "여행 > 숙박 > ",
                    ""
                )}</b>
            </div>
            <div class="text-grey font-weight-light my-1">${hotel.roadAddressName}</div>
            <div class="font-weight-light my-1">
                <div>
                <img src="src/assets/img/map-icons/phone.svg" style="width:15px"/> 
                ${hotel.phone}
                </div>
            </div>
            <div class="d-flex justify-content-end align-items-end">
                <button type="button" class="btn btn-success m-1" href="` +
            hotel.placeUrl +
            `">네이버에서보기</button>;
            </div>
        </div>
        `;
        const latlng = new kakao.maps.LatLng(hotel.lat, hotel.lng);

        const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            title: hotel.placeName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
            clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            image: markerImage, // 마커의 이미지
        });

        const infoWindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: true,
        });
        infoHotelWindows.push(infoWindow);

        kakao.maps.event.addListener(marker, "click", () => {
            // if (!selectedMarker || selectedMarker !== marker) {
            //     !!selectedMarker &&

            map.panTo(latlng);
            for (let infowindowTemp of infoHotelWindows) {
                infowindowTemp.close();
            }
            infoWindow.open(map, marker);

            // selectedMarker = marker;
        });
        hotelMarkers.value.push(marker);
    });
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
                    color="secondary"
                    icon="arrow_back"
                    :class="{ 'rotate-180': !leftDrawerOpen }"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
            </q-page-sticky>
            <q-page-sticky postiion="bottom" :offset="[18, 68]">
                <q-btn color="secondary" label="주변 숙소 보기" @click="getHotelList" />
            </q-page-sticky>
        </q-header>

        <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
            :width="500"
            class="p-1"
        >
            <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
                <q-img
                    class="my-4"
                    src="src/assets/img/logos/main-logo1.svg"
                    style="height: 100px"
                    @click="logoClick"
                >d
                </q-img>
                <div class="d-flex justify-content-end text-black">
                    <router-link id="board" class="nav-link mx-3" to="board"
                        >여행정보공유</router-link
                    >
                    <span v-for="menu in menuList" :key="menu.routeName">
                        <router-link
                            class="mx-3 text-black"
                            id="navbar-login"
                            v-if="menu.show"
                            :to="{ name: menu.routeName }"
                            >{{ menu.name }}
                        </router-link>
                    </span>
                </div>
                <div class="mr-4">
                    <div class="q-pa-md" style="display: flex; align-items: center">
                        <!-- Input -->
                        <q-input
                            v-model="inputKeyword"
                            label="키워드를 입력해주세요"
                            outlined
                            dense
                            class="main-input"
                        />

                        <!-- Button -->
                        <q-btn @click="search" label="검색" color="secondary" class="search-btn" />
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
                    </div>

                    <div v-show="!isDetailOpen" class="">
                        <div v-for="attraction in attractionList" :key="attraction.contentId">
                            <MapAttractionItem :attraction="attraction" />
                        </div>
                    </div>

                    <div v-if="isDetailOpen" class="">
                        <div>
                            <MapDetailItem></MapDetailItem>
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
    width: 90px;
}

.info-window {
    width: 250px;
    height: 170px;
}

a {
    text-decoration: none;
}
</style>
