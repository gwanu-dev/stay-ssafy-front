<script setup>
import MemberModifyVue from "./MemberModify.vue";
</script>

<template>
    <div class="row">
        <div class="col-3">
            <div class="list-group" id="list-tab" role="tablist">
                <a
                    class="list-group-item list-group-item-action active"
                    id="list-home-list"
                    data-bs-toggle="list"
                    href="#list-home"
                    role="tab"
                    aria-controls="list-home"
                    >내 정보</a
                >
                <a
                    class="list-group-item list-group-item-action"
                    id="list-profile-list"
                    data-bs-toggle="list"
                    href="#list-profile"
                    role="tab"
                    aria-controls="list-profile"
                    >내가 쓴 글</a
                >
                <a
                    class="list-group-item list-group-item-action"
                    id="list-messages-list"
                    data-bs-toggle="list"
                    href="#list-messages"
                    role="tab"
                    aria-controls="list-messages"
                    >북마크 한 관광지</a
                >
                <a
                    class="list-group-item list-group-item-action"
                    id="list-settings-list"
                    data-bs-toggle="list"
                    href="#list-settings"
                    role="tab"
                    aria-controls="list-settings"
                    >좋아요 한 게시글</a
                >
            </div>
        </div>
        <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
                <div
                    class="tab-pane fade show active"
                    id="list-home"
                    role="tabpanel"
                    aria-labelledby="list-home-list"
                >
                    <MemberModifyVue></MemberModifyVue>
                </div>
                <div
                    class="tab-pane fade"
                    id="list-profile"
                    role="tabpanel"
                    aria-labelledby="list-profile-list"
                >
                    1545
                </div>
                <div
                    class="tab-pane fade"
                    id="list-messages"
                    role="tabpanel"
                    aria-labelledby="list-messages-list"
                >
                    asda
                </div>
                <div
                    class="tab-pane fade"
                    id="list-settings"
                    role="tabpanel"
                    aria-labelledby="list-settings-list"
                >
                    898
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-group-item.active {
    background-color: #64a19d !important;
    border-color: #64a19d !important;
}
</style>
