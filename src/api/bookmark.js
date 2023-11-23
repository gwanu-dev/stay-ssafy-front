import { localAxios } from "@/util/http-commons";

const local = localAxios();
const BASE_URL = import.meta.env.VITE_BASE_URL + "/bookmark";

const CONSOLE_ROUTE = "[api/bookmark.js]";

export const registBookmark = async (contentId, memberId) => {
    let res = await local.post(BASE_URL + `?contentId=${contentId}&memberId=${memberId}`);
    console.log(CONSOLE_ROUTE, "regist bookmark : ", res);
    return res;
}

export const deleteBookmark = async (contentId, memberId) => {
    let res = await local.delete(BASE_URL + `?contentId=${contentId}&memberId=${memberId}`);
    console.log(CONSOLE_ROUTE, "delete bookmark : ", res);
    return res;
}