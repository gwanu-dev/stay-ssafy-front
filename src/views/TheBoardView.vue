<script setup>
import BranchNavigationBar from "../components/layout/BranchNavigationBar.vue";
</script>

<template>
    <div>
        <BranchNavigationBar></BranchNavigationBar>
        <div class="container text-center mt-3">
            <div class="container p-5"></div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style></style>
