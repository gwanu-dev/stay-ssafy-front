import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMypageAxiosStore } from "@/api/mypage.js";

const mypageaxios = useMypageAxiosStore()

export const useMypageStore = defineStore(
    "mypage",
    () => {
        const memberArticleList = ref([]);
        const likeList = ref([]);
        const bookmarkList = ref([]);

        const {
            getListByMemberId,
            getLikesByMemberId,
            getBookmarksByMemberId
        } = mypageaxios;

        const getArticleListByMemberId = async (memberId) => {
            console.log(memberId);
            memberArticleList.value = await getListByMemberId(memberId);
            console.log("store/mypage.js [getArticleListByMemberId]memberArticleList : ", memberArticleList.value);
        }

        const getLikeListByMemberId = async (memberId) => {
            console.log(memberId);
            likeList.value = await getLikesByMemberId(memberId);
            console.log("store/mypage.js [getLikeListByMemberId]likeList : ", likeList.value);
        }

        const getBookmarkListByMemberId = async (memberId) => {
            console.log(memberId);
            bookmarkList.value = await getBookmarksByMemberId(memberId);
            console.log("store/mypage.js [getBookmarkListByMemberId]bookmarkList : ", bookmarkList.value);
        }

        return {
            memberArticleList,
            likeList,
            bookmarkList,
            getArticleListByMemberId,
            getLikeListByMemberId,
            getBookmarkListByMemberId
        }
    }

)