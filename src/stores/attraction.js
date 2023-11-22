import { ref } from 'vue';
import { defineStore } from 'pinia';
import {getAttractionList, getSidoCodeList, getGugunCodeList, getContentTypeList} from '@/api/attraction.js'

const CONSOLE_ROUTE = "[stores/attraction.js]"


export const useAttractionStore = defineStore(
    "attractionStore",

    () => {
        

        const attractionList = ref();
        const sidoCodeList = ref();
        const gugunCodeList = ref();
        const contentTypeList = ref();


        const searchAttractions = async (typeDto) => {
            try {
                let res = await getAttractionList(typeDto);
                console.log(res.data);
                attractionList.value = res.data;
            } catch (err) {
                console.log(CONSOLE_ROUTE, err);
            }
        };

        const getSidoCode = async () => {
            try {
                let res =  await getSidoCodeList();
                sidoCodeList.value = res.data;
            } catch (err) {
                console.log(CONSOLE_ROUTE, err);
            }
            
        };

        const getGugunCode = async (sidoCode) => {
            try {
                let res = await getGugunCodeList(sidoCode);
                gugunCodeList.value = res.data;
            } catch (err) {
                console.log(CONSOLE_ROUTE, err);
            }
            
        }

        const getContentType = async () => {
            try {
                let res = await getContentTypeList();
                contentTypeList.value = res.data;
            } catch (err) {
                console.log(CONSOLE_ROUTE, err);
            }
            
        }

        return {
            attractionList, sidoCodeList, gugunCodeList, contentTypeList,
            searchAttractions, getSidoCode, getGugunCode, getContentType,
        }
    }
)