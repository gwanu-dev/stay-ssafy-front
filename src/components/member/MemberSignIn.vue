<script setup>
import { ref, reactive, onMounted } from "vue";
import { useAttractionStore } from "@/stores/attraction.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";
const attractionStore = useAttractionStore();
const memberStore = useMemberStore();

const { sidoCodeList, gugunCodeList } = storeToRefs(attractionStore);
const { getSidoCode, getGugunCode, getContentType } = attractionStore;
const { registMember } = memberStore;

const memberInfo = reactive({
    memberName: "",
    memberId: "",
    memberPassword: "",
    emailId: "",
    emailDomain: "",
    sido: "0",
    gugun: "0",
});

const passwordCheck = ref();
onMounted(async () => {
    await getSidoCode();
    await getContentType();
});

const register = () => {
    
    registMember(memberInfo);
};

const onChooseSidoCode = async () => {
    await getGugunCode(memberInfo.sido);
};
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
                        v-model="memberInfo.memberName"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-id" class="form-label">아이디:</label>
                    <input
                        type="text"
                        class="form-control"
                        id="member-id"
                        placeholder="아이디"
                        v-model="memberInfo.memberId"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-password" class="form-label">비밀번호:</label>
                    <input
                        type="password"
                        class="form-control"
                        id="member-password"
                        placeholder="비밀번호"
                        name="userpwd"
                        v-model="memberInfo.memberPassword"
                    />
                </div>
                <div class="mb-3">
                    <label for="member-passwordC-check" class="form-label">비밀번호 확인:</label>
                    <input
                        type="password"
                        class="form-control"
                        id="member-password-check"
                        placeholder="비밀번호 확인"
                        name="check_password"
                        v-model="passwordCheck"
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
                            v-model="memberInfo.emailId"
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
                            v-model="memberInfo.sido"
                            @change="onChooseSidoCode"
                        >
                            <option value="0" selected>시도 선택</option>
                            <option
                                v-for="sidoCode in sidoCodeList"
                                :key="sidoCode.sidoCode"
                                :value="sidoCode.sidoCode"
                            >
                                {{ sidoCode.sidoName }}
                            </option>
                        </select>
                        <select
                            id="gugun-code"
                            class="form-select me-2 d-inline"
                            name="gugun"
                            v-model="memberInfo.gugun"
                        >
                            <option value="0" selected>구군 선택</option>
                            <option
                                v-for="gugunCode in gugunCodeList"
                                :key="gugunCode.gugunCode"
                                :value="gugunCode.gugunCode"
                            >
                                {{ gugunCode.gugunName }}
                            </option>
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
            {{ memberInfo.memberName }} / {{ memberInfo.memberId }} /
            {{ memberInfo.memberPassword }} / {{ memberInfo.emailId }} /
            {{ memberInfo.emailDomain }} / {{ memberInfo.sido }} /
            {{ memberInfo.gugun }}
        </div>
    </div>
</template>

<style scoped></style>
