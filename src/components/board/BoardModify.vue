<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";

const { modify, articleno } = history.state;
console.log("[Modify.vue] modify : ", modify);
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="my-3 py-3 shadow-sm bg-light text-center">
                    <mark class="sky">글수정</mark>
                </h2>
            </div>
            <div class="col-lg-10 text-start">
                <BoardFormItem :modify="modify" :articleno="articleno" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
