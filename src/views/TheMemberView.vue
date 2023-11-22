<script setup>
import BranchNavigationBar from "@/components/layout/BranchNavigationBar.vue";
</script>

<template>
    <div>
        <BranchNavigationBar></BranchNavigationBar>
        <div class="text-center">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
