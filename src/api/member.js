import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();
const BASE_URL =  import.meta.env.VITE_BASE_URL + "/user";
export const useMemberAxiosStore = defineStore(
    "member-axios",
    () => {
        const getList = async () => {
            let userList;
            try {
                let res = await local.get(BASE_URL + `/admin/list`);
                userList = res.data;
                console.log("[api/member.js] userList : ", userList);
            } catch (err) {
                console.log(err);
            }
            return userList;
        };

        const regist = async (memberDto) => {
            try {
                await local.post(BASE_URL + `/regist`, memberDto);
                console.log("[api/member.js] regist sucess")
            } catch (err) {
                console.log(err);
            }
        };

        const get = async (id, password) => {
            let memberInfo;
            try {
                let res = await local.get(BASE_URL + `/login?id=${id}&password=${password}`);
                memberInfo = res.data;
                console.log("[api/member.js] get member Info :", memberInfo)
            } catch (err) {
                console.log(err);
            }
            return memberInfo;
        };

        const deleteOne = async (id) => {
            try {
                await local.delete(BASE_URL + `/delete?id=${id}`);
            
                console.log("[api/member.js] delete member success")
            } catch (err) {
                console.log(err);
            }
        };

        const edit = async (memberDto) => {
            try {
                await local.delete(BASE_URL + `/edit`, memberDto);
                console.log("[api/member.js] edit member success")
            } catch (err) {
                console.log(err);
            }
        };

        return {
            getList,
            regist,
            get,
            deleteOne,
            edit,
        }
    }
)
