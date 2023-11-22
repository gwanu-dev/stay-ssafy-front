<script setup>
import { onMounted } from "vue";
import { useMemberStore } from "@/stores/member.js";
import router from "@/router";
const memberStore = useMemberStore();
const { logoutMember } = memberStore;
onMounted(async () => {
    await logoutMember(sessionStorage.getItem("accessToken"));
    router.push({ name: "main" });
});
</script>

<template>
    <div></div>
</template>

<style scoped></style>
