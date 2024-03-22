import { createRouter, createWebHistory } from "vue-router";
import Login from "../Views/Login.vue";
import Register from "../Views/Register.vue";
import Main from "../Views/Main.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/home",
      name: "Home",
      component: Main,
    },

  ],
  linkActiveClass: "active-link",
});

export default router;
