
import { localAxios } from "@/util/http-commons";

const local = localAxios();
const BASE_URL =  import.meta.env.VITE_BASE_URL + "/attraction/search";

const CONSOLE_ROUTE = "[api/attraction.js]"; 

export const getAttractionList = async (typeDto) => {
    let res = await local.get(BASE_URL+ `?sido=${typeDto.sido}&gugun=${typeDto.gugun}&contentTypeId=${typeDto.contentTypeId}&keyword=${typeDto.keyword}`)
    console.log(CONSOLE_ROUTE, "attractionList : ", res);
    return res;
};
export const getSidoCodeList = async () => {
    let res = await local.get(BASE_URL + `/sido`);
    console.log(CONSOLE_ROUTE, "sidoCodeList : ", res);
    return res;
};
export const getGugunCodeList = async (sidoCode) => {
    let res = await local.get(BASE_URL + `/gugun?sidoCode=${sidoCode}`);
    console.log(CONSOLE_ROUTE, "gugunCodeList : ", res);
    return res;
};
export const getContentTypeList = async () => {
    let res = await local.get(BASE_URL + `/contentType`);
    console.log(CONSOLE_ROUTE, "contentTypeList : ", res);
    return res;
};
