import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMemberAxiosStore } from "@/api/member.js";
import { HttpStatusCode } from 'axios';
import { jwtDecode } from "jwt-decode";
import router from "@/router"

const memberaxios = useMemberAxiosStore();


const CONSOLE_PATH = "[stores/member.js]"

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
            logout,
            refreshToken,
            idCheck,
            emailCheck,
        } = memberaxios;

        const member = ref({
            memberName: "",
            memberId: "",
            memberPassword: "",
            emailId: "",
            emailDomain: "",
            sido: "0",
            gugun: "0",            
        });
        const isLogin = ref(false);
        const isLoginError = ref(false);
        const isValidToken = ref(false);


        const getMemberList = async () => {
            let memberList;
            try {
                let res = await getList();
                memberList = res.data;
                console.log(CONSOLE_PATH, "memberList : ", memberList)
            } catch (err) {
                console.log(err)
            }
            return memberList;
        }

        const registMember = async (memberDto) => {
            try {
                await regist(memberDto);
                console.log(CONSOLE_PATH, "regist Member success")
            } catch (err) {
                console.log(CONSOLE_PATH, err)
            }
        }

        const getMember = async (token) => {
            let memberInfo;
            console.log(CONSOLE_PATH, "getMember Entered")
            let decodeToken = jwtDecode(token);
            console.log(CONSOLE_PATH, "decode Token", decodeToken);
            try {
                let res = await get(decodeToken.userId);
                console.log(CONSOLE_PATH, "res : ", res);

                if (res.status === HttpStatusCode.Ok) {
                    memberInfo = res.data;
                    console.log(CONSOLE_PATH, "get memberInfo : ", memberInfo)
                } else {
                    console.log(CONSOLE_PATH, "No Member Data!!");
                }
                member.value = memberInfo;
            } catch (err) {
                console.error(
                    CONSOLE_PATH, "getMember error code [Token expired] :::", err.response.status
                );
                isValidToken.value = false;

                await tokenRegernate();
            }
        };

        const deleteMember = async (id) => {
            try {
                await deleteOne(id);
                console.log(CONSOLE_PATH, "delete member : ", id)
            } catch (err) {
                console.log(err)
            }
        }

        const editMember = async (memberDto) => {
            try {
                await edit(memberDto);
                console.log(CONSOLE_PATH, "edited member")
            } catch (err) {
                console.log(err)
            }
        }
        const loginMember = async (memberDto) => {
            console.log(CONSOLE_PATH, "Login Member method");
            let res = await login(memberDto);
            console.log(CONSOLE_PATH, "Login Member res:", res);
            if (res.status == HttpStatusCode.Created) {
                let { data } = res;

                let accessToken = data["access-token"];
                let refreshToken = data["refresh-token"];

                console.log(CONSOLE_PATH, "accessToken : ", accessToken);
                console.log(CONSOLE_PATH, "refreshToken : ", refreshToken);

                isLogin.value = true;
                isLoginError.value = false;
                isValidToken.value = true;

                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("refreshToken", refreshToken);
                console.log(CONSOLE_PATH, "Tokens are saved at session.");
                return res.status
            } else {
                console.log(CONSOLE_PATH, "Login Failed!");
                isLogin.value = false;
                isLoginError.value = true;
                isValidToken.value = false;
                return res.status
            }
        };

        const logoutMember = async (token) => {
            let decodeToken = jwtDecode(token)
            console.log("decodeToken", decodeToken);
            let memberId = decodeToken.userId;
            try {
                let res = await logout(memberId);
                if (res.status === HttpStatusCode.Ok) {
                    isLogin.value = false;
                    member.value = null;
                    isValidToken.value = false;
                    console.log(CONSOLE_PATH, "logged out!");
                    sessionStorage.removeItem("accessToken")
                    sessionStorage.removeItem("refreshToken")
                } else {
                    console.log(CONSOLE_PATH, "no Member Info")
                }
            } catch (err) {
                console.log(CONSOLE_PATH, err);
            }
        }

        const memberIdDuplicateCheck = async (id) => {
            console.log(CONSOLE_PATH, "idCheck started");
            try {
                let res = await idCheck(id);

                console.log(CONSOLE_PATH, "idCheck res :", res.data);
                return res.status;
            } catch (err) {
                console.log(CONSOLE_PATH, err);
            }
        }

        const memberEmailDuplicateCheck = async (emailId, emailDomain) => {
            console.log(CONSOLE_PATH, "emailCheck started");
            try {
                let res = await emailCheck(emailId, emailDomain);
                console.log(CONSOLE_PATH, "emailCheck res :", res.data);
                return res.status;
            } catch (err) {
                console.log(CONSOLE_PATH, err);
            }
        }


        const tokenRegernate = async () => {
            console.log(CONSOLE_PATH, "Regen Token >> expired Token info : {}", sessionStorage.getItem("accessToken"));
            try {
                let res = await refreshToken(
                    JSON.stringify(member.value)
                );
                if (res.status === HttpStatusCode.Created) {
                    let accessToken = res.data["access-token"];
                    console.log(CONSOLE_PATH, "regen Token success >> new Token :", accessToken);
                    sessionStorage.setITem("accessToken", accessToken);
                    isValidToken.value = true;
                }
            } catch (err) {
                if (err.response.status === HttpStatusCode.Unauthorized) {
                    console.log(CONSOLE_PATH, "regen Token Failed")

                    // remove refreshToken in database before login again
                    try {
                        let res = await logout(
                            member.value.userId
                        )
                        if (res.status === HttpStatusCode.Ok) {
                            console.log(CONSOLE_PATH, "Refresh Token remove : Success")
                        }
                        else {
                            console.log(CONSOLE_PATH, "Refresh Token remove : Failed")
                        }

                        alert("[정보] RefreshToken의 기간이 만료되었습니다. 다시 로그인 해주세요!!")

                        isLogin.value = false;
                        member.value = null;
                        isValidToken.value = false;
                        router.push({ name: "" })
                    } catch (err) {
                        console.error(err);
                        isLogin.value = false;
                        member.value = null;
                    }

                }
            }
        };

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
            logoutMember,
            memberIdDuplicateCheck,
            memberEmailDuplicateCheck,
        }

        
    }
)
