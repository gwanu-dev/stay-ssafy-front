import { ref } from 'vue';
import { defineStore } from 'pinia';
import { axios } from 'axios';


export const useAttractionAxiosStore = defineStore(
    "attraction-axios",
    () => {
        const getAttractionList = () => {

        };
        const getSidoCodeList = () => {

        };
        const getGugunCodeList = () => {
            
        };
        const getContentTypeList = () => {

        };
        return {
            getAttractionList,
            getSidoCodeList,
            getGugunCodeList,
            getContentTypeList,
        }
    }
)