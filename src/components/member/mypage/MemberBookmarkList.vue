<script setup>

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-left text-secondary">
                <h4>북마크 한 관광지</h4>
            </div>
            <hr class="hr hr-4 m-3" />
            <div class="col-lg-10">
                <div v-show="!isDetailOpen" class="">
                    <div v-for="attraction in bookmarkList" :key="attraction.contentId">
                        <MapAttractionItem :attraction="attraction" />
                    </div>
                </div>

                <div v-if="isDetailOpen" class="">
                    <div>
                        <MapDetailItem></MapDetailItem>
                    </div>
                </div>
            </div>
            <PageNavigation
                :current-page="currentPage"
                :total-page="totalPage"
                @pageChange="onPageChange"
            ></PageNavigation>
        </div>
    </div>
</template>

<style scoped></style>
