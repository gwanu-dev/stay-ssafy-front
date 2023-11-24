<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
const router = useRouter();
const route = useRoute();

const props = defineProps({ modify: Boolean, articleno: String });

import { storeToRefs } from "pinia";
import { useBoardStore } from "@/stores/board.js";
const board = useBoardStore();
const { getArticleDetail, putArticle, editArticle } = board;
const { article } = storeToRefs(board);

const isUseId = ref(true);

let token = sessionStorage.getItem("accessToken");
let decodeToken;
let id;

console.log(props);
const articleDetail = ref({
    articleNo: 0,
    subject: "",
    content: "",
    memberId: "",
    memberName: "",
    hit: 0,
    registerTime: "",
});

onMounted(async () => {
    if (props.modify) {
        let articleno = Number(props.articleno);
        console.log(articleno + "번글 얻어와서 수정할거야");
        await getArticleDetail(articleno);

        articleDetail.value.articleNo = article.value.articleNo;
        articleDetail.value.subject = article.value.subject;
        articleDetail.value.content = article.value.content;
        articleDetail.value.memberId = article.value.memberId;
        articleDetail.value.memberName = article.value.memberName;
        articleDetail.value.hit = article.value.hit;
        articleDetail.value.registerTime = article.value.registerTime;
    } else {
        if (token) {
            decodeToken = jwtDecode(token);
            articleDetail.value.memberId = decodeToken.userId;
            articleDetail.value.memberName = decodeToken.userId;
            // alert(decodeToken.userId);
        }
    }
    console.log(articleDetail.value);
});

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
    () => articleDetail.value.subject,
    (value) => {
        let len = value.length;
        if (len == 0 || len > 30) {
            subjectErrMsg.value = "제목을 확인해 주세요!!!";
        } else subjectErrMsg.value = "";
    },
    { immediate: true }
);
watch(
    () => articleDetail.value.content,
    (value) => {
        let len = value.length;
        if (len == 0 || len > 500) {
            contentErrMsg.value = "내용을 확인해 주세요!!!";
        } else contentErrMsg.value = "";
    },
    { immediate: true }
);

const onSubmit = async () => {
    // event.preventDefault();

    if (subjectErrMsg.value) {
        alert(subjectErrMsg.value);
    } else if (contentErrMsg.value) {
        alert(contentErrMsg.value);
    } else {
        props.modify ? updateArticle() : writeArticle();
        moveList();
    }
};

const writeArticle = () => {
    putArticle(articleDetail.value);
    console.log(articleDetail.value);
};

const updateArticle = () => {
    editArticle(articleDetail.value);
    console.log(articleDetail.value);
};

const moveList = () => {
    router.replace({ name: "article-list" });
};
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="memberid" class="form-label">작성자 ID : </label>
            <input
                type="text"
                class="form-control"
                v-model="articleDetail.memberId"
                :disabled="isUseId"
                placeholder="작성자ID..."
            />
        </div>
        <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input
                type="text"
                class="form-control"
                v-model="articleDetail.subject"
                placeholder="제목..."
            />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea class="form-control" v-model="articleDetail.content" rows="10"></textarea>
        </div>
        <div class="col-auto text-center">
            <button
                type="submit"
                class="btn btn-outline-primary mb-3"
                v-if="!modify"
                @click="onSubmit"
            >
                글작성
            </button>
            <button type="submit" class="btn btn-outline-success mb-3" v-else @click="onSubmit">
                글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
                목록으로이동...
            </button>
        </div>
    </form>
</template>
<style scoped></style>
