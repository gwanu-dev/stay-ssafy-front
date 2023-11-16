import { ref} from 'vue';
import { defineStore } from 'pinia';
import { useAttractionAxiosStore } from '@/api/attraction.js'

const attractionaxios = useAttractionAxiosStore();

export const useAttractionStore = defineStore(
    "attractionStore",

    () => {
        const {
            getAttractionList,
            getSidoCodeList,
            getGugunCodeList,
            getContentTypeList,
        } = attractionaxios;

        const attractionList = ref();
        const sidoCodeList = ref();
        const gugunCodeList = ref();
        const contentTypeList = ref();


        const searchAttractions = async (typeDto) => {
            attractionList.value = await getAttractionList(tpyeDto);
        };

        const getSidoCode = async() => {
            sidoCodeList.value = await getSidoCodeList();
        };

        const getGugunCode = async (sidoCode) => {
            gugunCodeList.value = await getGugunCodeList(sidoCode);
        }

        const getContentType = async () => {
            contentTypeList.value = await getContentTypeList();
        }

        return {
            attractionList, sidoCodeList, gugunCodeList, contentTypeList,
            searchAttractions, getSidoCode, getGugunCode, getContentType,
        }
    }
)