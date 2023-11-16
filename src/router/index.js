import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "/src/views/PresentationView.vue";
// import { useMemberStore } from "@/stores/member.js";

// const { memberStore } = useMemberStore();
// const { logoutMember } = memberStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: PresentationView,
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/TheBoardView.vue"),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [{
        path: "list",
        name: "article-list",
        component: () => import("../components/board/BoardList.vue")
      },
      {
        path: "view/:articleno",
        name: "article-view",
        component: () => import("@/components/board/BoardDetail.vue"),
      },
      {
        path: "write",
        name: "article-write",
        component: () => import("@/components/board/BoardWrite.vue")
        
      },
      {
        path: "modify",
        name: "article-modify",
        component: () => import("@/components/board/BoardModify.vue"),
      
      },
      ]
    
    },
    { path: "/member",
      name: "member",
      component: () => import("@/views/TheMemberView.vue"),
      children: [
        {
          path: "login",
          name: "member-login",
          component: () => import("@/components/member/MemberLogin.vue")
        },
        {
          path: "signin",
          name: "member-signin",
          component: () => import("@/components/member/MemberSignIn.vue")
        }, {
          path: "info",
          name: "member-info",
          component: () => import("@/components/member/MemberDetail.vue")
        }, {
          path: "edit",
          name: "member-edit", //TODO
          component: () => import("@/components/member/MemberDetail.vue")
        }, {
          path: "logout",
          name: "member-logout",
          component: () => import("@/components/member/MemberLogout.vue")
          
        }
      ]
    },
    {
      path: "/attraction",
      name: "attraction",
      component: () => import("@/views/TheMapView.vue"),
    }
        // {
        //   path: "/error",
        //   name: "error",
        //   component : Error,
        // },
  ],
});

export default router;