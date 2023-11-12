<script setup></script>

<template>
    <footer
        class="footer navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-center"
    >
        <div class="row">
            <ul class="navbar-nav align-content-center">
                <li><a href="#" class="navlink text-secondary">홈페이지소개</a></li>
                <li><a href="#" class="navlink text-secondary">개인정보처리방침</a></li>
                <li><a href="#" class="navlink text-secondary">이용약관</a></li>
                <li><a href="#" class="navlink text-secondary">이용방법</a></li>
                <li><a class="navlink text-secondary">&copy; SSAFY corp.</a></li>
            </ul>
        </div>
    </footer>
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

.footer {
    padding: 20px;
    display: flex;
}

.text-secondary {
    font-size: 15px;
    margin: 0.5rem;
}

a {
    text-decoration: none;
}

#registerModal {
    position: fixed;
    top: 5%;
}
#loginModal {
    top: 25%;
}
</style>
