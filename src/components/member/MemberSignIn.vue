<script setup>
import { ref, reactive, onMounted } from "vue";

const memberInfo = reactive({
    name: "",
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
    emailDomain: "",
    sidoCode: "",
    gugunCode: "",
});

onMounted(() => {});

const register = () => {};
</script>

<template>
    <div class="" id="register-view">
        <div class="">
            <h4 class="">회원가입</h4>
        </div>
        <!-- Modal body -->
        <div class="">
            <form id="form-join">
                <div class="mb-3">
                    <label for="member-name" class="form-label">이름:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="member-name"
                        placeholder="이름"
                        v-model="memberInfo.name"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-id" class="form-label">아이디:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="member-id"
                        placeholder="아이디"
                        v-model="memberInfo.id"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-password" class="form-label">비밀번호:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="member-password"
                        placeholder="비밀번호"
                        name="userpwd"
                        v-model="memberInfo.password"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-passwordC-check" class="form-label">비밀번호 확인:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="member-password-check"
                        placeholder="비밀번호 확인"
                        name="check_password"
                        v-model="memberInfo.passwordCheck"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-email" class="form-label d-block">이메일 :</label>
                    <div class="d-inline-flex">
                        <input
                            type="text"
                            class="form-control rounded-end-0"
                            id="member-email"
                            placeholder="이메일아이디"
                            v-model="memberInfo.email"
                        />
                        <div
                            class="text-center text-lg-center align-self-center p-2 bg-light border border-1"
                            style="font-size: larger"
                        >
                            @
                        </div>
                        <select
                            id="member-email-domain"
                            class="form-select me-2 d-inline rounded-start-0"
                            name="emaildomain"
                            v-model="memberInfo.emailDomain"
                        >
                            <option value="0" selected>이메일 선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="ssafy.com">ssafy.com</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="sido-code" class="form-label d-block">지역 :</label>
                    <div class="d-inline-flex">
                        <select
                            id="sido-code"
                            class="form-select me-2 d-inline"
                            name="cido"
                            v-model="memberInfo.sidoCode"
                        >
                            <option value="0" selected>시도 선택</option>
                        </select>
                        <select
                            id="gugun-code"
                            class="form-select me-2 d-inline"
                            name="gugun"
                            v-model="memberInfo.gugunCode"
                        >
                            <option value="0" selected>구군 선택</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <!-- Modal footer -->
        <div class="">
            <button
                type="button"
                id="btn-register"
                class="btn btn-primary btn-sm"
                @click="register"
            >
                회원가입
            </button>
            <button type="button" id="goback" class="btn btn-primary btn-sm">초기화</button>
            <button type="button" class="btn btn-outline-danger btn-sm">닫기</button>
        </div>

        <div>
            {{ memberInfo.id }} / {{ memberInfo.password }}/ {{ memberInfo.passwordCheck }}/
            {{ memberInfo.emailDomain }}/ {{ memberInfo.sidoCode }}/ {{ memberInfo.gugunCode }}
        </div>
    </div>
</template>

<style scoped></style>
