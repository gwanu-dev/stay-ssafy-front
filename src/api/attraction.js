import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();
const BASE_URL =  import.meta.env.VITE_BASE_URL + "/attraction";

export const useAttractionAxiosStore = defineStore(
    "attraction-axios",
    () => {
        const getAttractionList = async (typeDto) => {
            let attractionList;
            try {
                let res = await local.get(BASE_URL, typeDto)
                attractionList = res.data;
                console.log("[api/attraction.js] attractionList : ", attractionList);
            } catch (err) {
                console.log(err);
            }
            return attractionList;
        };
        const getSidoCodeList = async (sido, gugun, contentType) => {
            let sidoCodeList;
            try {
                let res = await local.get(BASE_URL + `/sido?sido=${sido}&gugun=${gugun}&contentTypeId=${contentType}`);
                sidoCodeList = res.data;
                console.log("[api/attraction.js] sidoCodeList : ", sidoCodeList);
            } catch (err) {
                console.log(err);
            }
            return sidoCodeList;
        };
        const getGugunCodeList = async (sidoCode) => {
            let gugunCodeList;
            try {
                let res = await local.get(BASE_URL + `/gugun?sidoCode=${sidoCode}`);
                gugunCodeList = res.data;
                console.log("[api/attraction.js] gugunCodeList : ", gugunCodeList);
            } catch (err) {
                console.log(err);
            }
            return gugunCodeList;
        };
        const getContentTypeList = async () => {
            let contentTypeList;
            try {
                let res = await local.get(BASE_URL + `/contentType`);
                contentTypeList = res.data;
    
                console.log("[api/attraction.js] contentTypeList : ", contentTypeList);
            } catch (err) {
                console.log(err);
            }

            return contentTypeList;
        };
        return {
            getAttractionList,
            getSidoCodeList,
            getGugunCodeList,
            getContentTypeList,
        }
    }
)