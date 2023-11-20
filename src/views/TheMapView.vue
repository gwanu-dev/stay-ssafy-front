<script setup>
import KakaoMap from "@/components/map/KakaoMap.vue";
</script>

<template>
    <div id="map-screen">
        <KakaoMap />
    </div>
</template>

<style scoped>
html,
body {
    width: 100vw;
    height: 100vh;
}
#map-screen {
    width: 100vw;
    height: 100vh;
}
</style>
