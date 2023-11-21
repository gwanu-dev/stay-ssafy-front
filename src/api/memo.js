import { defineStore } from 'pinia'
import { localAxios } from "@/util/http-commons"

const local = localAxios()

const BASE_MEMO_URL = import.meta.env.VITE_BASE_URL + "/memo";
const CONSOLE_ROUTE = "[api/memo.js]"
export const useMemoAxiosStore = defineStore(
    "memoAxios",
    () => {
        const postMemo = async(memoDto) => {
            let res = await local.post(BASE_MEMO_URL + `/${memoDto.articleNo}`, memoDto);
            console.log(CONSOLE_ROUTE, "postMemo :", res)
            return res;
        }

        const postSubMemo = async(superNo, memoDto) => {
            let res = await local.post(BASE_MEMO_URL + `/reply/${memoDto.articleNo}?superNo=${superNo}`, memoDto);

            console.log(CONSOLE_ROUTE, "postSubMemo :", res)
            return res;
        }

        const putMemo = async(memoDto) => {
            let res = await local.put(BASE_MEMO_URL + `/${memoDto.articleNo}`, memoDto);

            console.log(CONSOLE_ROUTE, "putMemo :", res)
            return res;
        }

        const deleteMemo = async(memoDto) => {
            let res = await local.delete(BASE_MEMO_URL + `/${memoDto.articleNo}?memoNo=${memoDto.memoNo}`);

            console.log(CONSOLE_ROUTE, "deleteMemo :", res)
            return res;
        }

        return {postMemo, postSubMemo, putMemo, deleteMemo}
    }
)