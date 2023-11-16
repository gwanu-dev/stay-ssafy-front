<script setup>
import { onMounted } from "vue";
import { useMemberStore } from "@/stores/member.js";
import router from "@/router";
import { useMenuStore } from "@/stores/menu";

const menuStore = useMenuStore();
const { changeMenuState } = menuStore;

const memberStore = useMemberStore();
const { logoutMember } = memberStore;
onMounted(async () => {
    changeMenuState();
    await logoutMember(sessionStorage.getItem("accessToken"));
    router.push({ name: "main" });
});
</script>

<template>
    <div></div>
</template>

<style scoped></style>
