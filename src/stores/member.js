import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useMemberAxiosStore } from "@/api/member.js";

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
        } = memberaxios;

        const member = ref();
        const isLogin = ref(false);
        const isLoginError = ref(false);
        const isValidToken = ref(false);

        const userLogin = 1;

        const getMemberList = async () => {
            let memberList;
            try {
                let res = await getList();
                memberList = res;
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

        const getMember = async (id, pwd) => {
            let memberInfo;
            try {
                let res = await get(id, pwd);
                memberInfo = res;
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

        return {
            member,
            getMember,
            registMember,
            getMemberList,
            deleteMember,
            editMember,
        }
    }
)
