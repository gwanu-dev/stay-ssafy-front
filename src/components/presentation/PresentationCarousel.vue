<script setup>
import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attraction.js";

// const attractionStore = useAttractionStore();
</script>

<template>
    <div>
        <header class="mainhead">
            <div
                class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center"
            >
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto text-white my-0 text-uppercase">Enjoytrip</h1>
                        <h2 class="text-black-50 mx-auto mt-2 mb-5">
                            Enjoytrip과 함께 우리 지역의 관광지를 알아보고 나만의 여행 계획을
                            세워보세요!
                        </h2>
                        <a class="btn btn-primary" href="#">시작하기</a>
                    </div>
                </div>
            </div>
        </header>

        <section class="mytripplan text-center" id="mytripplan">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-black mb-4">나만의 여행계획</h2>
                        <p class="text-black-50">
                            여행 경로, 숙박, 관광지, 예상 금액 등 나만의 멋진 계획을 세워
                            공유해주세요!
                        </p>
                    </div>
                </div>
                <div class="mycardlist d-flex justify-content-center">
                    <div class="card m-3" style="width: 400px">
                        <img
                            class="card-img-top"
                            src="src/assets/img/mytripcard00.jpg"
                            alt="Card image"
                        />
                        <div class="card-body">
                            <h4 class="card-title">John Doe</h4>
                            <p class="card-text">Some example text.</p>
                            <a href="#" class="btn btn-primary">See Profile</a>
                        </div>
                    </div>
                    <div class="card m-3" style="width: 400px">
                        <img
                            class="card-img-top"
                            src="src/assets/img/mytripcard00.jpg"
                            alt="Card image"
                        />
                        <div class="card-body">
                            <h4 class="card-title">John Doe</h4>
                            <p class="card-text">Some example text.</p>
                            <a href="#" class="btn btn-primary">See Profile</a>
                        </div>
                    </div>
                    <div class="card m-3" style="width: 400px">
                        <img
                            class="card-img-top"
                            src="src/assets/img/mytripcard00.jpg"
                            alt="Card image"
                        />
                        <div class="card-body">
                            <h4 class="card-title">John Doe</h4>
                            <p class="card-text">Some example text.</p>
                            <a href="#" class="btn btn-primary">See Profile</a>
                        </div>
                    </div>
                    <div class="card m-3" style="width: 400px">
                        <img
                            class="card-img-top"
                            src="src/assets/img/mytripcard00.jpg"
                            alt="Card image"
                        />
                        <div class="card-body">
                            <h4 class="card-title">John Doe</h4>
                            <p class="card-text">Some example text.</p>
                            <a href="#" class="btn btn-primary">See Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="hot-place text-center" id="hotplace">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-black mb-4">핫플 자랑하기</h2>
                        <p class="text-black-50">
                            여행지에서 가장 핫하다고 생각했던 장소를 공유해주세요!
                        </p>
                    </div>
                    <img class="mb-5" src="src/assets/img/hotplaceexample.png" />
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
</style>
