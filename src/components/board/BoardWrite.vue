<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h4 class="my-3 py-3 text-left">글 작성</h4>
            </div>
            <hr />
            <div class="col-lg-10 text-start">
                <BoardFormItem type="regist" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
