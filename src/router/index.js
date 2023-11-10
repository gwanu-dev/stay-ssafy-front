import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/PresentationView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: PresentationView,
    },
  ],
});

export default router;
