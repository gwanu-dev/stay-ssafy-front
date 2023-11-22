<script setup>
import { ref } from "vue";
import router from "@/router";

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js";
import { useMenuStore } from "@/stores/menu";
import { MdAlternateemail } from "oh-vue-icons/icons";

const menuStore = useMenuStore();

const { changeMenuState } = menuStore;

const memberStore = useMemberStore();

const { loginMember } = memberStore;
const { isLogin } = storeToRefs(memberStore);

const idInput = ref("");
const passwordInput = ref("");

const login = async () => {
    let memberDto = {
        memberId: idInput.value,
        memberPassword: passwordInput.value,
    };
    let code = await loginMember(memberDto);
    if (code === 201) {
        console.log("[MemberLogin.vue] isLogin : ", isLogin);

        alert("로그인 되었습니다. 환영합니다.");

        if (isLogin) {
            router.push({ name: "main" });
        }
    } else {
        alert("아이디 혹은 비밀번호가 틀렸습니다. 다시 입력해주세요");
    }
};
</script>

<template>
    <div class="bg-gradient-primary min-vh-100 d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                        <div class="card-header bg-white">
                            <h3 class="text-center font-weight-light my-4">로그인</h3>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="login">
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="idInput"
                                        placeholder="아이디"
                                    />
                                    <label for="inputMemberId">아이디</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input
                                        type="password"
                                        class="form-control"
                                        v-model="passwordInput"
                                        placeholder="비밀번호"
                                    />
                                    <label for="inputMemberPwd">비밀번호</label>
                                </div>
                                <div
                                    class="d-flex align-items-center justify-content-between mt-4 mb-0"
                                >
                                    <button type="submit" class="btn btn-primary btn-block">
                                        로그인
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-gradient-primary {
    background: linear-gradient(45deg, #6f42c1, #007bff);
}

.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.02);
}

.form-floating input[type="text"],
.form-floating input[type="password"] {
    border-radius: 25px;
}
</style>
