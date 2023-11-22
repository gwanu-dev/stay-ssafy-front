<script setup>
defineProps({ attraction: Object });
</script>

<template>
    <div>
        <hr class="solid" />
        <q-card class="my-card">
            <q-img
                :src="
                    attraction.firstImage
                        ? attraction.firstImage
                        : `@/assets/img/illustrations/illustration-signin.jpg`
                "
            >
                <div class="absolute-bottom text-h6">
                    {{ attraction.title }}
                </div>
            </q-img>
            {{ attraction.addr1 }} <br />
            조회수 : {{ attraction.readcount }}
            <!-- 설명 : {{ attraction }} -->
        </q-card>
    </div>
</template>

<style scoped></style>
