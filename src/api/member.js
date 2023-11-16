import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();

const BASE_URL =  import.meta.env.VITE_BASE_URL + "/member";
export const useMemberAxiosStore = defineStore(
    "memberaxios",
    () => {
        const getList = async () => {
            let res = await local.get(BASE_URL + `/admin/list`);
            console.log("[api/member.js] userList : ", res);
            return res;
        };

        const regist = async (memberDto) => {
            let res = await local.post(BASE_URL + `/regist`, memberDto);
            console.log("[api/member.js] regist", res)
            return res;
        };


        // TODO : wait til api done
        // const login = async (id, password) => {
        //     let memberInfo;
        //     try {
        //         let res = await local.get(BASE_URL + `/login?id=${id}&password=${password}`);
        //         memberInfo = res.data;
        //         console.log("[api/member.js] login member:", memberInfo)
        //     } catch (err) {
        //         console.log(err);
        //     }
        //     return memberInfo;
        // };

        const get = async (id) => {
            let res = await local.get(BASE_URL + `/info/${id}`);
            console.log("[api/member.js] get member Info :", res)
            
            return res;
        };

        const deleteOne = async (id) => {
            let res = await local.delete(BASE_URL + `/delete?id=${id}`);
        
            console.log("[api/member.js] delete member")
            return res;
        };

        const edit = async (memberDto) => {
            let res = await local.delete(BASE_URL + `/edit`, memberDto);
            console.log("[api/member.js] edit member")
            return res;
        };

        const login = async (memberDto) => {
            let res = await local.post(BASE_URL + `/login`, memberDto);
            console.log("[api.member.js] login member", res);
            return res;
            
        }

        return {
            getList,
            regist,
            get,
            deleteOne,
            edit,
            login
        }
    }
)
