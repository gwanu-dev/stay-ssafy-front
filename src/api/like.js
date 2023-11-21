import { defineStore } from 'pinia'
import { localAxios } from "@/util/http-commons"

const local = localAxios()

const BASE_LIKE_URL = import.meta.env.VITE_BAST_URL + "/like";
const CONSOLE_ROUTE = "[api/like.js]"

export const useLikeAxiosStore = defineStore(
    "likeAxios",
    () => {
    const registLike = async (articleNo, memberId) => {
        let res = await local.post(BASE_LIKE_URL, `?articleNo=${articleNo}&memberId=${memberId}`)
        console.log(CONSOLE_ROUTE, "regist like : ", res)
        return res;
    }
    const deleteLike = async (articleNo, memberId) => {
        let res = await local.delete(BASE_LIKE_URL, `?articleNo=${articleNo}&memberId=${memberId}`)
        console.log(CONSOLE_ROUTE, "delete like : ", res)
        return res;
    }

    return {
        registLike,
        deleteLike,
    }
});