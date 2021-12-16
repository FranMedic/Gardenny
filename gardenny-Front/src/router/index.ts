import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import GardennyLogin from "../views/GardennyLogin.vue";
import GardennyRegister from "@/views/GardennyRegister.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "GardennyLogin",
    component: GardennyLogin,
  },

  {
    path: "/register",
    name: "GardennyRegister",
    component: GardennyRegister,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
