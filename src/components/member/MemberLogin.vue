<script setup>
import { ref } from "vue";
import router from "@/router";

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member.js";
import { useMenuStore } from "@/stores/menu";

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
    await loginMember(memberDto);
    console.log("[MemberLogin.vue] isLogin : ", isLogin);

    if (isLogin) {
        await changeMenuState();
        router.push({ name: "main" });
    }
};
</script>

<template>
    <div class="align-content-center" id="login-box">
        <div class="w-25 modal-lg">
            <div class="justify-content-center">
                <!-- Modal Header -->
                <div class="">
                    <h4 class="">
                        <i class=""> 로그인</i>
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal body -->
                <div class="">
                    <form id="form-login" method="POST" action="">
                        <input type="hidden" name="action" value="login" />
                        <div class="mb-3">
                            <label for="" class="form-label">아이디 :</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="idInput"
                                placeholder="아이디"
                                name="memberid"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">비밀번호 :</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model="passwordInput"
                                placeholder="비밀번호"
                                name="memberpwd"
                            />
                        </div>
                    </form>
                </div>
                <!-- Modal footer -->
                <div class="">
                    <button
                        type="button"
                        id="btn-login"
                        class="btn btn-primary btn-sm"
                        @click="login"
                    >
                        로그인
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
