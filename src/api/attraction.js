
import { localAxios } from "@/util/http-commons";

const local = localAxios();
const BASE_URL =  import.meta.env.VITE_BASE_URL + "/attraction";

const CONSOLE_ROUTE = "[api/attraction.js]"; 

export const getAttractionList = async (typeDto) => {
    let res = await local.get(BASE_URL+ `/search?sido=${typeDto.sido}&gugun=${typeDto.gugun}&contentTypeId=${typeDto.contentTypeId}&keyword=${typeDto.keyword}`)
    console.log(CONSOLE_ROUTE, "attractionList : ", res);
    return res;
};
export const getSidoCodeList = async () => {
    let res = await local.get(BASE_URL + `/search/sido`);
    console.log(CONSOLE_ROUTE, "sidoCodeList : ", res);
    return res;
};
export const getGugunCodeList = async (sidoCode) => {
    let res = await local.get(BASE_URL + `/search/gugun?sidoCode=${sidoCode}`);
    console.log(CONSOLE_ROUTE, "gugunCodeList : ", res);
    return res;
};
export const getContentTypeList = async () => {
    let res = await local.get(BASE_URL + `/search/contentType`);
    console.log(CONSOLE_ROUTE, "contentTypeList : ", res);
    return res;
};


export const getKakaoMapHotelList = async (latlng) => {
    let res = await local.get(BASE_URL + `/kakaomap?lat=${latlng.getLat()}&lng=${latlng.getLng()}`);
    console.log(CONSOLE_ROUTE, "kakaoMapHotelList : ", res);
    return res;
};