import { defineStore } from 'pinia';
import { localAxios } from "@/util/http-commons";

const local = localAxios();

const BASE_MEMBER_URL =  import.meta.env.VITE_BASE_URL + "/member";
const BASE_MYPAGE_URL =  import.meta.env.VITE_BASE_URL + "/mypage";
export const useMemberAxiosStore = defineStore(
    "memberaxios",
    () => {

        //  /member

        const regist = async (memberDto) => {
            let res = await local.post(BASE_MEMBER_URL + `/regist`, memberDto);
            console.log("[api/member.js] regist", res)
            return res;
        };

        const verify = async (id) => {
            let res = await local.get(BASE_MEMBER_URL + `/verify/${id}`);
            console.log("[api/member.js] get member Info :", res)
            
            return res;
        };

        const login = async (memberDto) => {
            let res = await local.post(BASE_MEMBER_URL + `/login`, memberDto);
            console.log("[api/member.js] login member", res);
            return res;
        }

        const logout = async (memberId) => {
            let res = await local.get(BASE_MEMBER_URL + `/logout/${memberId}`);
            return res;
        }

        const refreshToken = async (memberDto) => {
            local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); // axios-header에 refresh-token 세팅
            let res = await local.post(BASE_MEMBER_URL + `/refresh`, memberDto);
            console.log("[api/member.js] refresh token", res);
            return res;
        }


        // mypage

        const getList = async () => {
            let res = await local.get(BASE_MYPAGE_URL + `/admin/list`);
            console.log("[api/member.js] memberList : ", res);
            return res;
        };
        const get = async (memberId) => {
            let res = await local.get(BASE_MYPAGE_URL + `/info/${memberId}`);
            console.log("[api/member.js] member : ", res);
            return res;
        };
        
        const edit = async (memberDto) => {
            let res = await local.delete(BASE_MYPAGE_URL + `/edit`, memberDto);
            console.log("[api/member.js] edit member")
            return res;
        };
        const deleteOne = async (id) => {
            let res = await local.delete(BASE_MYPAGE_URL + `/delete?id=${id}`);
        
            console.log("[api/member.js] delete member")
            return res;
        };

        return {
            getList,
            regist,
            verify,
            get,
            deleteOne,
            edit,
            login,
            logout,
            refreshToken
        }
    }
)
