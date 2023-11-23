<script setup>
import MemberDetailList from "./MemberDetailList.vue";
</script>

<template>
    <div class="container text-center mt-3">
        <div class="container p-5"></div>
        <router-view></router-view>
        <MemberDetailList></MemberDetailList>
    </div>
</template>

<style scoped></style>
