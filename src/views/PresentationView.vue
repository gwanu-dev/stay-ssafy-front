<script setup>
import { QLayout } from "quasar";
import CommonFooter from "../components/common/CommonFooter.vue";
import CommonHeader from "../components/common/CommonHeader.vue";
import MainNavigationBar from "../components/layout/MainNavigationBar.vue";
import PresentationCarousel from "../components/presentation/PresentationCarousel.vue";
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <CommonHeader />
        <MainNavigationBar />
        <PresentationCarousel />
        <div></div>

        <CommonFooter />
    </q-layout>
</template>

<style scoped></style>
