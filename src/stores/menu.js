import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore(
    "menuStore",
    () => {
        const menuState = ref(false)

        const menuList = ref([
            { name: "로그인", show: computed(() => { return !menuState.value }), routeName: "member-login" },
            { name: "회원가입", show: computed(() => { return !menuState.value }), routeName: "member-signin" },
            { name: "내정보", show: computed(() => { return menuState.value }), routeName: "member-info" },
            { name: "로그아웃", show: computed(() => { return menuState.value }), routeName: "member-logout" },
        ]);

        return {  
            menuState,
            menuList,
        }
    }

)