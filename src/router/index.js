import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import ListView from "../views/ListView.vue";
import Create from "../views/Create.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },

  routes: [
    {
      path: "/auth",
      component: Auth,
      children: [
        { path: "login", component: SignIn },
        { path: "sign-up", component: SignUp },
      ],
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/create",
      component: Create,
    },
    {
      path: "/list-view/:listId",
      name: "List-View",
      component: ListView,
    },
  ],
});
export default router;
