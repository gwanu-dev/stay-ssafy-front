import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();

const BASE_URL = import.meta.env.VITE_BASE_URL + "/board";
export const useBoardAxiosStore = defineStore(
    "boardaxios",
    () => {
        const getAll = async (pageDto) => {
            let articleList;
            try {
                let res = await local
                    .get(
                        BASE_URL + `/list?pgno=${pageDto.value.pgno}&key=${pageDto.value.key}&word=${pageDto.value.word}`
                    );
                articleList = res.data;
                console.log("-----");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
            return articleList;
        };

        const getDetail = async (articleno) => {
            let article;
            try {
                let res = await local.get(BASE_URL + `/view/${articleno}`);
                article = res.data;
                console.log("[AXIOS] article : ", article);
            } catch (err) {
                console.log(err)
            }
            return article;
        };

        const put = async (boardDto) => {
            try {
                await local.post(BASE_URL + `/write`, boardDto)
            }catch(err) {
                console.log(err)
            }
        };

        const update = async (boardDto) => {
            try {
                await local.put(BASE_URL + `/edit`, boardDto)
            } catch (err) {
                console.log(err)
            }
        };

        const deleteOne = async (articleno) => {
            try {
                await local.delete(BASE_URL + `/delete`, { params: { articleNo: Number(articleno) } })
            } catch (err) {
                console.log(err)
            }
        };

        const getCount = async (typeDto) => {
            let pageCount;
            let listSize = import.meta.env.VITE_ARTICLE_LIST_SIZE;
            console.log("listSize : ", listSize);
            try {
                let res = await local.get(
                    BASE_URL + `/list-count?pgno=${typeDto.value.pgno}&key=${typeDto.value.key}&word=${typeDto.value.word}`
                )
                console.log("res : ", res.data);
                pageCount = Math.ceil(res.data / listSize);
                console.log("pages : ", pageCount);
            } catch (err) {
                console.log(err)
            }
            return pageCount;
        };

        return {
            getAll,
            getDetail,
            put,
            update,
            deleteOne,
            getCount,
        };
    }
)
