<script setup>
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attraction.js";
import { useMemberStore } from "@/stores/member.js";

const attractionStore = useAttractionStore();
const memberStore = useMemberStore();

const { getMember } = memberStore;
const { member, isLogin, isValidToken } = storeToRefs(memberStore);

const { getSidoCode, getGugunCode } = attractionStore;
const { sidoCodeList, gugunCodeList } = storeToRefs(attractionStore);

const isMemberExist = ref(false);

onMounted(async () => {
    await getMember(sessionStorage.getItem("accessToken"));
    if (getMember) isMemberExist.value = true;
    await getSidoCode();
    if (member.value.sido) {
        await getGugunCode(member.value.sido);
    }
    console.log("MemberDetail : ", member.value);
});
</script>

<template>
    <div>
        <div v-if="isMemberExist">
            {{ member.memberName }}
            {{ member.memberId }}
            {{ member.memberPassword }}
            {{ member.emailId }}
            {{ member.emailDomain }}
        </div>
    </div>
</template>

<style scoped></style>
