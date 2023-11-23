<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores/menu";

const menuStore = useMenuStore();

const { menuList, menuState } = storeToRefs(menuStore);

const onLogClick = () => {
    if (sessionStorage.getItem("accessToken")) {
        menuState.value = true;
    } else {
        menuState.value = false;
    }
};
</script>

<template>
    <div>
        <nav
            class="navbar navbar-expand-lg navbar-shrink shadow p-2 mb-5 bg-white rounded fixed-top"
            id="mainNav"
        >
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="" :to="{ name: 'main' }">STAYSSAFY</a>
                <button
                    class="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-tartget="#navbarResponsive"
                    aria-expanded="false"
                    aria-lable="Toggle navigation"
                >
                    Menu <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link
                                id="attraction"
                                class="nav-link"
                                :to="{ name: 'attraction' }"
                                >지역별여행지</router-link
                            >
                            <!-- <a id="tripbyarea" class="nav-link" href="#">지역별여행지</a> -->
                        </li>
                        <li class="nav-item"><a class="nav-link" href="">지역별숙소찾기</a></li>
                        <li class="nav-item">
                            <router-link id="board" class="nav-link" :to="{ name: 'board' }"
                                >여행정보공유</router-link
                            >
                            <!-- <a id="board" class="nav-link" @click="goToBoard">여행정보공유</a> -->
                            <!-- <a id="board" class="nav-link" href="">여행정보공유 </a> -->
                        </li>
                        <li class="nav-item" v-for="menu in menuList" :key="menu.routeName">
                            <router-link
                                class="nav-link"
                                id="navbar-login"
                                v-if="menu.show"
                                :to="{ name: menu.routeName }"
                                >{{ menu.name }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
#mainNav {
    min-height: 3.5rem;
    background-color: #fff;
}
#mainNav .navbar-toggler {
    font-size: 80%;
    padding: 0.75rem;
    color: #64a19d;
    border: 1px solid #64a19d;
}
#mainNav .navbar-toggler:focus {
    outline: none;
}
#mainNav .navbar-brand {
    color: #000;
    font-weight: 700;
    padding: 0.9rem 0;
}
#mainNav .navbar-nav .nav-item:hover {
    color: fade(#fff, 80%);
    outline: none;
    background-color: transparent;
}
#mainNav .navbar-nav .nav-item:active,
#mainNav .navbar-nav .nav-item:focus {
    outline: none;
    background-color: transparent;
}
@media (min-width: 992px) {
    #mainNav {
        padding-top: 0;
        padding-bottom: 0;
        border-bottom: none;
        background-color: transparent;
        transition: background-color 0.3s ease-in-out;
    }
    #mainNav .navbar-brand {
        padding: 0.5rem 0;
        color: rgba(255, 255, 255, 0.8);
    }
    #mainNav .nav-link {
        transition: none;
        padding: 2rem 1.5rem;
        color: rgba(255, 255, 255, 0.8);
    }
    #mainNav .nav-link:hover {
        color: rgba(255, 255, 255, 0.95);
    }
    #mainNav .nav-link:active {
        color: #fff;
    }
    #mainNav.navbar-shrink {
        background-color: #ffffff;
    }
    #mainNav.navbar-shrink .navbar-brand {
        color: #000;
    }
    #mainNav.navbar-shrink .nav-link {
        color: #000;
        padding: 1.5rem 1.5rem 1.25rem;
        border-bottom: 0.25rem solid transparent;
    }
    #mainNav.navbar-shrink .nav-link:hover {
        color: #64a19d;
    }
    #mainNav.navbar-shrink .nav-link:active {
        color: #467370;
    }
    #mainNav.navbar-shrink .nav-link.active {
        color: #64a19d;
        outline: none;
        border-bottom: 0.25rem solid #64a19d;
    }

    #mainNav.navbar-light {
        box-shadow: 0 0px 0px #000;
    }
}

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

.text-secondary {
    font-size: 15px;
    margin: 0.5rem;
}

a {
    text-decoration: none;
}
</style>
