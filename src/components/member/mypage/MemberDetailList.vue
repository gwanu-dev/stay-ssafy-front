<script setup>
import MemberModifyVue from "./MemberModify.vue";
import MemberBoardList from "./MemberBoardList.vue";
import MemberLikeList from "./MemberLikeList.vue";
import MemberBookmarkList from "./MemberBookmarkList.vue"
</script>

<template>
    <div class="row">
        <div class="col-3">
            <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" 
                id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">내 정보</a>
            <a class="list-group-item list-group-item-action" 
                id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">내가 쓴 게시글</a>
            <a class="list-group-item list-group-item-action" 
                id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">좋아요 한 게시글</a>
            <a class="list-group-item list-group-item-action" 
                id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">북마크 한 관광지</a>
            </div>
        </div>
        <div class="col-9">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                    <MemberModifyVue></MemberModifyVue>
                </div>
                <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <MemberBoardList></MemberBoardList>
                </div>
                <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                    <MemberLikeList></MemberLikeList>
                </div>
                <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                    <MemberBookmarkList></MemberBookmarkList>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-group-item.active {
    background-color:  #64a19d !important;
    border-color: #64a19d !important;
}
</style>