import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();

const BASE_URL = import.meta.env.VITE_BASE_URL + "/mypage";
export const useMypageAxiosStore = defineStore(
    "mypageaxios",
    () => {
        const getListByMemberId = async (memberId) => {
            let articleList;
            try {
                let res = await local
                    .get(BASE_URL + `/articles/${memberId}`);
                articleList = res.data;
                console.log("---[AXIOS] articles---");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
            return articleList;
        };

        const getLikesByMemberId = async (memberId) => {
            let articleList;
            try {
                let res = await local
                    .get(BASE_URL + `/likes/${memberId}`);
                articleList = res.data;
                console.log("---[AXIOS] likes---");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
            return articleList;
        };

        const getBookmarksByMemberId = async (memberId) => {
            let bookmarkList;
            try {
                let res = await local
                    .get(BASE_URL + `/bookmarks/${memberId}`);
                bookmarkList = res.data;
                console.log("---[AXIOS] likes---");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
            return bookmarkList;
        };

        return {
            getListByMemberId,
            getLikesByMemberId,
            getBookmarksByMemberId,
        };
    }
)
