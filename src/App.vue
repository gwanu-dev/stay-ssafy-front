<script setup>
import { RouterView } from "vue-router";

import MemberLogin from "@/components/Member/MemberLogin.vue";
import MemberSignIn from "./components/member/MemberSignIn.vue";
</script>

<template>
    <div>
        <member-login></member-login>
        <member-sign-in></member-sign-in>
    </div>
    <!-- <router-view></router-view> -->
</template>
