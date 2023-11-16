import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMemberAxiosStore } from "@/api/member.js";
import { HttpStatusCode } from 'axios';

const memberaxios = useMemberAxiosStore();

export const useMemberStore = defineStore(
    "memberStore",
    () => {
        const {
            getList,
            regist,
            get,
            deleteOne,
            edit,
            login,
        } = memberaxios;

        const member = ref();
        const isLogin = ref(false);
        const isLoginError = ref(false);
        const isValidToken = ref(false);


        const getMemberList = async () => {
            let memberList;
            try {
                let res = await getList();
                memberList = res.data;
                console.log("[stores/member.js] memberList : ", memberList)
            } catch (err) {
                console.log(err)
            }
            return memberList;
        }

        const registMember = async (memberDto) => {

            try {
                await regist(memberDto);
                console.log("[stores/member.js] regist Member success")
            } catch (err) {
                console.log(err)
            }
        }

        const getMember = async (id) => {
            let memberInfo;
            try {
                let res = await get(id);
                memberInfo = res.data;
                console.log("[stores/member.js] get memberInfo : ", memberInfo)
            } catch (err) {
                console.log(err)
            }

            member.value = memberInfo;
        }

        const deleteMember = async (id) => {
            try {
                await deleteOne(id);
                console.log("[stores/member.js] delete member : ", id)
            } catch (err) {
                console.log(err)
            }
        }

        const editMember = async (memberDto) => {
            try {
                await edit(memberDto);
                console.log("[stores/member.js] edited member")
            } catch (err) {
                console.log(err)
            }

        }

        const loginMember = async (memberDto) => {
            console.log("[stores/member.js] Login Member method");
            try {
                let res = await login(memberDto);
                if (res.status == HttpStatusCode.Created) {
                    let { data } = res;

                    let accessToken = data["access-token"];
                    let refreshToken = data["refresh-token"];

                    console.log("[stores/member.js] accessToken : ", accessToken);
                    console.log("[stores/member.js] refreshToken : ", refreshToken);

                    isLogin.value = true;
                    isLoginError.value = false;
                    isValidToken.value = true

                    sessionStorage.setItem("accessToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);
                    console.log("Tokens are saved at session.");
                } else {
                    console.log("Login Failed!");
                isLogin.value = false;
                isLoginError.value = true;
                isValidToken.value = false;
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        return {
            member,
            isLogin,
            isLoginError,
            isValidToken,
            getMember,
            registMember,
            getMemberList,
            deleteMember,
            editMember,
            loginMember,
        }
    }
)
