<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useAttractionStore } from "@/stores/attraction.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";
import router from "@/router";
const attractionStore = useAttractionStore();
const memberStore = useMemberStore();

const { sidoCodeList, gugunCodeList } = storeToRefs(attractionStore);
const { getSidoCode, getGugunCode, getContentType } = attractionStore;
const { registMember, memberIdDuplicateCheck, memberEmailDuplicateCheck } = memberStore;

const memberInfo = reactive({
    memberName: "",
    memberId: "",
    memberPassword: "",
    emailId: "",
    emailDomain: "",
    sido: "0",
    gugun: "0",
});

let idDuplicationMessageList = [
    {
        message: "아이디를 입력해주세요.",
        style: { color: "black" },
    },
    {
        message: "유효하지 않은 아이디입니다. 아이디는 6자 이상 14자 이하입니다.",
        style: { color: "red" },
    },
    {
        message: "아이디에는 영어와 숫자만 가능합니다. 다시 확인해주세요.",
        style: { color: "red" },
    },
    {
        message: "중복되는 아이디입니다. 다른 아이디를 입력해주세요.",
        style: { color: "red" },
    },
    {
        message: "사용 가능한 아이디입니다.",
        style: { color: "green" },
    },
];

let pwdCheckMessageList = [
    {
        message: "비밀번호를 입력해주세요.",
        style: { color: "black" },
    },
    {
        message: "비밀번호는 8~20자 사이, 영어 대소문자와 특수 기호를 포함해야 합니다.",
        style: { color: "red" },
    },
    {
        message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        style: { color: "red" },
    },
    {
        message: "입력 완료",
        style: { color: "green" },
    },
];

let emailCheckMessageList = [
    {
        message: "이메일을 입력해주세요.",
        style: { color: "black" },
    },
    {
        message: "유효하지 않은 이메일 아이디입니다.",
        style: { color: "red" },
    },
    {
        message: "중복되는 이메일 입니다.",
        style: { color: "red" },
    },
    {
        message: "등록 가능한 이메일입니다.",
        style: { color: "green" },
    },
];
// id 관련
const idInput = ref("");
const idDuplicationMessage = ref(idDuplicationMessageList[0]);
const isIdValid = ref(false);

// 비밀번호 관련
const passwordInput = ref("");
const passwordCheckInput = ref("");
const isPasswordValid = ref(false);
const isPasswordEquals = ref(false);
const passwordValidMessage = ref(pwdCheckMessageList[0]);
const passwordCheckValidMessage = ref(pwdCheckMessageList[0]);

// 이메일 관련
const emailIdInput = ref("");
const emailDomainInput = ref("");
const isEmailValid = ref(false);
const emailValidMessage = ref(emailCheckMessageList[0]);

// const isSignInAvailable = ref(false);

onMounted(async () => {
    await getSidoCode();
    await getContentType();
});

// id 중복 체크 및 유효성 검사
watch(idInput, async () => {
    let regexId = /^[A-Za-z0-9][A-Za-z0-9]*$/;
    console.log("valueChanged, ", idInput.value);
    if (!idInput.value) {
        // 아이디 입력 없을 때
        isIdValid.value = false;
        idDuplicationMessage.value = idDuplicationMessageList[0];
    } else if (idInput.value.length < 6 || idInput.value.length > 14) {
        // 아이디 길이 확인
        isIdValid.value = false;
        idDuplicationMessage.value = idDuplicationMessageList[1];
    } else if (!regexId.test(idInput.value)) {
        // 영어, 숫자 외 확인
        isIdValid.value = false;
        idDuplicationMessage.value = idDuplicationMessageList[2];
    } else {
        let status = await memberIdDuplicateCheck(idInput.value);
        if (status === 202) {
            // 아이디 유효
            isIdValid.value = true;
            idDuplicationMessage.value = idDuplicationMessageList[4];
        } else {
            // 아이디 중복
            isIdValid.value = false;
            idDuplicationMessage.value = idDuplicationMessageList[3];
        }
    }
});

// 비밀번호 체크
watch(passwordInput, async () => {
    var num = passwordInput.value.search(/[0-9]/g);
    var eng = passwordInput.value.search(/[a-z]/gi);
    var Eng = passwordInput.value.search(/[A-Z]/gi);
    var spe = passwordInput.value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    if (
        num < 0 ||
        eng < 0 ||
        Eng < 0 ||
        spe < 0 ||
        passwordInput.value.length < 8 ||
        passwordInput.value.length > 20
    ) {
        // 정규식으로 영어, 숫자, 특수기호 확인
        isPasswordValid.value = false;
        passwordValidMessage.value = pwdCheckMessageList[1];
    } else {
        isPasswordValid.value = true;
        passwordValidMessage.value = pwdCheckMessageList[3];
    }
});

// 비밀번호 중복 체크
watch(passwordCheckInput, () => {
    if (passwordCheckInput.value === passwordInput.value) {
        isPasswordEquals.value = true;
        passwordCheckValidMessage.value = pwdCheckMessageList[3];
    } else {
        isPasswordEquals.value = false;
        passwordCheckValidMessage.value = pwdCheckMessageList[2];
    }
});

// 이메일 체크
watch(emailDomainInput, async () => {
    if (emailIdInput.value && emailDomainInput.value != "0") {
        let status = await memberEmailDuplicateCheck(emailIdInput.value, emailDomainInput.value);
        if (status === 202) {
            isEmailValid.value = true;
            emailValidMessage.value = emailCheckMessageList[3];
        } else {
            isEmailValid.value = false;
            emailValidMessage.value = emailCheckMessageList[2];
        }
    } else {
        isEmailValid.value = false;
        emailValidMessage.value = emailCheckMessageList[1];
    }
});

// 등록 함수
const register = () => {
    if (!isIdValid.value) {
        alert("아이디 입력을 확인해주세요!");
        return;
    }
    if (!isPasswordValid.value || !isPasswordEquals.value) {
        alert("비밀번호 입력을 확인해주세요!");
        return;
    }
    if (!isEmailValid.value) {
        alert("이메일을 확인해주세요!");
        return;
    }

    memberInfo.memberId = idInput.value;
    memberInfo.memberPassword = passwordInput.value;
    memberInfo.emailId = emailIdInput.value;
    memberInfo.emailDomain = emailDomainInput.value;

    registMember(memberInfo);
    router.redirect({ name: "main" });
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
                        v-model="idInput"
                    />
                    <div>
                        <p :style="idDuplicationMessage.style">
                            {{ idDuplicationMessage.message }}
                        </p>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="member-password" class="form-label">비밀번호:</label>
                    <input
                        type="password"
                        class="form-control"
                        id="member-password"
                        placeholder="비밀번호"
                        name="memberpwd"
                        v-model="passwordInput"
                    />
                    <div>
                        <p :style="passwordValidMessage.style">
                            {{ passwordValidMessage.message }}
                        </p>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="member-passwordC-check" class="form-label">비밀번호 확인:</label>
                    <input
                        type="password"
                        class="form-control"
                        id="member-password-check"
                        placeholder="비밀번호 확인"
                        name="check_password"
                        v-model="passwordCheckInput"
                    />
                    <div>
                        <p :style="passwordCheckValidMessage.style">
                            {{ passwordCheckValidMessage.message }}
                        </p>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="member-email" class="form-label d-block">이메일 :</label>
                    <div class="d-inline-flex">
                        <input
                            type="text"
                            class="form-control rounded-end-0"
                            id="member-email"
                            placeholder="이메일아이디"
                            v-model="emailIdInput"
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
                            v-model="emailDomainInput"
                        >
                            <option value="0" selected>이메일 선택</option>
                            <option value="naver.com">naver.com</option>
                            <option value="gmail.com">gmail.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="ssafy.com">ssafy.com</option>
                        </select>
                    </div>
                    <div>
                        <p :style="emailValidMessage.style">
                            {{ emailValidMessage.message }}
                        </p>
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
    </div>
</template>

<style scoped></style>
