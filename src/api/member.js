import { ref } from 'vue';
import { defineStore } from 'pinia';
import { axios } from 'axios';

export const useMemberAxiosStore = defineStore(
    "member-axios",
    () => {
        const getMemberList = () => {

        };

        const registMember = () => {

        };

        const getMember = () => {

        };

        const deleteMember = () => {

        };

        const editMember = () => {

        };

        return {
            getMemberList,
            registMember,
            getMember,
            deleteMember,
            editMember,
        }
    }
)
