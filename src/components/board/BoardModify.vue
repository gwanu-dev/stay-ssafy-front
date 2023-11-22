<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";

const { modify, articleno } = history.state;
console.log("[Modify.vue] modify : ", modify);
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h4 class="my-3 py-3 text-left">글 수정</h4>
            </div>
            <hr />
            <div class="col-lg-10 text-start">
                <BoardFormItem :modify="modify" :articleno="articleno" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
