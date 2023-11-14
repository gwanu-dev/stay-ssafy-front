import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useBoardAxiosStore } from "@/api/board.js";

const boardaxios = useBoardAxiosStore()
export const useBoardStore = defineStore(
    "board",
    () => {
        const articleList = ref([]);
        const article = ref({})
        const articleCount = ref(0);
        const {
            getAll,
            getDetail,
            put,
            update,
            deleteOne,
            getCount,
        } = boardaxios;

        
        
        const getArticleList = async (typeDto) => {
            articleList.value = await getAll(typeDto);
            console.log("store/board.js [getArticleList]articleList : ", articleList.value);
        }

        const getArticleDetail = async (articleno) => {
            article.value = await getDetail(articleno);
        }

        const getArticleCount = async (typeDto) => {
            articleCount.value = await getCount(typeDto);
            console.log("typeDto : ", typeDto);
            console.log("articleCount = ", articleCount);
        }

        const putArticle = async (boardDto) => {
            await put(boardDto);
        }

        const editArticle = async (boardDto) => {
            await update(boardDto);
        }

        const deleteArticle = async (articleno) => {
            await deleteOne(articleno);
        }

        return {
            article,
            articleList,
            articleCount,
            getArticleList,
            getArticleDetail,
            getArticleCount,
            putArticle,
            editArticle,
            deleteArticle,
        }
    }

)