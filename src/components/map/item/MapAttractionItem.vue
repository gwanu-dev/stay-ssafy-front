<script setup>
defineProps({ attraction: Object });
</script>

<template>
    <div>
        <hr class="solid" />
        <q-card class="my-card mx-5 my-4">
            <q-img
                :src="
                    attraction.firstImage
                        ? attraction.firstImage
                        : `@/assets/img/illustrations/illustration-signin.jpg`
                "
            >
                <div class="absolute-bottom text-h6">
                    <b>{{ attraction.title }}</b>
                </div>
            </q-img>
            주 소 : {{ attraction.addr1 }} <br />
            조회수 : {{ attraction.readcount }}<br />
            설명 : {{ attraction.description.overview }}
        </q-card>
    </div>
</template>

<style scoped></style>
