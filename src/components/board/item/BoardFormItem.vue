<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const article = ref({
    articleNo: 0,
    subject: "",
    content: "",
    memberId: "",
    memberName: "",
    hit: 0,
    registerTime: "",
});

if (props.type === "modify") {
    let { articleno } = route.params;
    console.log(articleno + "번글 얻어와서 수정할거야");
    // API 호출
    isUseId.value = true;
}

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
    () => article.value.subject,
    (value) => {
        let len = value.length;
        if (len == 0 || len > 30) {
            subjectErrMsg.value = "제목을 확인해 주세요!!!";
        } else subjectErrMsg.value = "";
    },
    { immediate: true }
);
watch(
    () => article.value.content,
    (value) => {
        let len = value.length;
        if (len == 0 || len > 500) {
            contentErrMsg.value = "내용을 확인해 주세요!!!";
        } else contentErrMsg.value = "";
    },
    { immediate: true }
);

const onSubmit = () => {
    // event.preventDefault();

    if (subjectErrMsg.value) {
        alert(subjectErrMsg.value);
    } else if (contentErrMsg.value) {
        alert(contentErrMsg.value);
    } else {
        props.type === "regist" ? writeArticle() : updateArticle();
        moveList();
    }
};

const writeArticle = () => {
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    console.log(article.value);
    axios.post(`/api/enjoytrip/board/write`, article.value).then((res) => {
        console.log(article.value);
    });
};

const updateArticle = () => {
    axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
    axios.put(`/api/enjoytrip/board/edit`, { data: { boardDto: article.value } }).then((res) => {
        console.log(article.value);
    });
};

const moveList = () => {
    router.push({ name: "article-list" });
};
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="userid" class="form-label">작성자 ID : </label>
            <input
                type="text"
                class="form-control"
                v-model="article.memberId"
                :disabled="isUseId"
                placeholder="작성자ID..."
            />
        </div>
        <div class="mb-3">
            <label for="subject" class="form-label">제목 : </label>
            <input
                type="text"
                class="form-control"
                v-model="article.subject"
                placeholder="제목..."
            />
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">내용 : </label>
            <textarea class="form-control" v-model="article.content" rows="10"></textarea>
        </div>
        <div class="col-auto text-center">
            <button
                type="submit"
                class="btn btn-outline-primary mb-3"
                v-if="type === 'regist'"
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
