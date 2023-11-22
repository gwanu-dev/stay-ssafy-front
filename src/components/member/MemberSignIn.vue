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
        message: "비밀번호는 8~20자 사이, 영어 대소문자와 특수 기호, 숫자를 포함해야 합니다.",
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
    router.replace({ name: "main" });
};

const onChooseSidoCode = async () => {
    await getGugunCode(memberInfo.sido);
};
</script>

<template>
    <div class="container-fluid">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-4">
                <div class="card shadow-lg rounded-lg">
                    <div class="card-header bg-primary text-white text-center py-3 d-flex">
                        <h4 class="mb-0">회원가입</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register" class="p-3">
                            <div class="mb-3 align-items-center">
                                <label for="member-name" class="form-label mb-0 me-3 d-flex fs-5"
                                    >이름</label
                                >
                                <input
                                    type="text"
                                    class="form-control flex-grow-1"
                                    id="member-name"
                                    placeholder="이름"
                                    v-model="memberInfo.memberName"
                                />
                            </div>
                            <div class="mb-3 align-items-center">
                                <label for="member-id" class="form-label mb-0 me-3 d-flex fs-5"
                                    >아이디</label
                                >
                                <input
                                    type="text"
                                    class="form-control flex-grow-1"
                                    id="member-id"
                                    placeholder="아이디"
                                    v-model="idInput"
                                />
                                <div>
                                    <p class="d-flex" :style="idDuplicationMessage.style">
                                        {{ idDuplicationMessage.message }}
                                    </p>
                                </div>
                            </div>
                            <div class="mb-3 justify-content-start align-items-center">
                                <label
                                    for="member-password"
                                    class="d-flex form-label mb-0 me-3 fs-5"
                                    >비밀번호</label
                                >
                                <input
                                    type="password"
                                    class="form-control flex-grow-1"
                                    id="member-password"
                                    placeholder="비밀번호"
                                    v-model="passwordInput"
                                />
                                <div>
                                    <p class="d-flex" :style="passwordValidMessage.style">
                                        {{ passwordValidMessage.message }}
                                    </p>
                                </div>
                            </div>
                            <div class="mb-3 align-items-center">
                                <label
                                    for="member-password-check"
                                    class="d-flex form-label mb-0 me-3 fs-5"
                                    >비밀번호 확인</label
                                >
                                <input
                                    type="password"
                                    class="form-control flex-grow-1"
                                    id="member-password-check"
                                    placeholder="비밀번호 확인"
                                    v-model="passwordCheckInput"
                                />
                                <div>
                                    <p class="d-flex" :style="passwordCheckValidMessage.style">
                                        {{ passwordCheckValidMessage.message }}
                                    </p>
                                </div>
                            </div>
                            <div class="mb-3 align-items-start justify-content-start">
                                <label for="member-email" class="d-flex form-label mb-0 me-3 fs-5"
                                    >이메일</label
                                >
                                <div class="d-flex justify-content-start">
                                    <input
                                        type="text"
                                        class="form-control rounded-end-0 email"
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
                                        class="form-select me-2 rounded-start-0 email"
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
                                    <p class="d-flex" :style="emailValidMessage.style">
                                        {{ emailValidMessage.message }}
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-primary me-2">회원가입</button>
                                <button type="button" class="btn btn-secondary me-2">초기화</button>
                                <button type="button" class="btn btn-outline-secondary">
                                    닫기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

/* Customize or add additional styles here */
<style scoped>
.container-fluid {
    background-color: #f5f5f5;
}

.card {
    transition: transform 0.2s;
}



.email {
    width: 180px;
}

.card:hover {
    transform: scale(1.02);
}
/* Add any necessary additional styling */
</style>
