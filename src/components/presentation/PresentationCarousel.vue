<script setup>
import PresentationCardItem from "./item/PresentationCardItem.vue";
import axios from "axios";
</script>

<script>
export default {
    name: "App",
    mounted() {
        this.fetchData();
    },
    data() {
        return {
            data: this.data,
        };
    },
    methods: {
        fetchData() {
            axios
                .get("api/enjoytrip/attraction/recommend")
                .then((response) => {
                    //recommendList = response.data;
                    this.data = response.data;
                    console.log(this.data[0].title);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<template>
    <div>
        <header class="mainhead">
            <div
                class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center"
            >
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto text-white my-0 text-uppercase">STAYSSAFY</h1>
                        <br /><br />
                        <h2 class="text-black-50 mx-auto mt-2 mb-5">
                            <p>STAYSSAFY와 함께</p>
                            <p>우리 지역 관광지와 숙소를 알아보고</p>
                            <p>나만의 여행 계획을 세워보세요!</p>
                        </h2>
                        <router-link
                            :to="{ name: 'attraction-name-search' }"
                            class="btn hButton text-bold"
                        >
                            시작하기
                        </router-link>
                    </div>
                </div>
            </div>
        </header>

        <section class="mytripplan text-center" id="mytripplan">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-black mb-4">지금 가장 뜨는 여행지</h2>
                        <p class="text-black-50">지금 가장 인기있는 여행지를 만나보세요!</p>
                    </div>
                </div>
                <div class="mycardlist d-flex justify-content-center">
                    <PresentationCardItem v-for="d in data" :key="d.contentId" :attraction="d">
                    </PresentationCardItem>
                </div>
            </div>
        </section>

        <section class="hot-place text-center" id="hotplace">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-black mb-4">핫플 공유하기</h2>
                        <p class="text-black-50">나만 알고 있는 여행지를 모두에게 공유해주세요!</p>
                    </div>
                    <div class="col-lg-8">
                        <router-link
                            :to="{ name: 'article-list' }"
                            class="btn btn-success"
                            style="width: 30%"
                        >
                            공유하러 가기
                        </router-link>
                    </div>
                    <br /><br />
                    <img class="my-5 rounded" src="src/assets/img/hotplaceexample.png" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.mainhead h1 {
    font-family: "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 2.5rem;
    line-height: 2.5rem;
    letter-spacing: 0.8rem;
    background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.78));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}
h6,
.h6,
h5,
.h5,
h4,
.h4,
h3,
.h3,
h2,
.h2,
h1,
.h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}

.masthead h2 {
    max-width: 20rem;
    font-size: 1rem;
    line-height: 150%;
}

.mainhead {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 35rem;
    padding: 15rem 0;
    background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(255, 255, 255, 0.6) 75%,
            #ffffff 100%
        ),
        url("src/assets/img/bg-mainhead.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
}

.mytripplan {
    padding-top: 10rem;
    background: linear-gradient(
        to bottom,
        #ffffff 0%,
        rgba(255, 255, 255, 0.9) 75%,
        rgba(255, 255, 255, 0.8) 100%
    );
}

.hot-place {
    padding-top: 10rem;
    background: linear-gradient(
        to bottom,
        #ffffff 0%,
        rgba(182, 182, 182, 0.9) 75%,
        rgba(177, 177, 177, 0.8) 100%
    );
}

.text-secondary {
    font-size: 15px;
    margin: 0.5rem;
}

a {
    text-decoration: none;
}

.hButton {
    background: #51a49a;
    color: #ffffff;
    border: none;
    position: relative;
    height: 60px;
    font-size: 2.8em;
    padding: 0 2em;
    cursor: pointer;
    transition: 800ms ease all;
    outline: none;
}

.hButton:hover {
    background: #f2eee500;
    color: #51a49a;
}

.hButton:before,
.hButton:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #ffffff;
    transition: 400ms ease all;
}

.hButton:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
}

.hButton:hover:before,
.hButton:hover:after {
    width: 100%;
    transition: 800ms ease all;
}
</style>
