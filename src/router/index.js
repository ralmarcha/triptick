import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import ListView from "../views/ListView.vue";
import ListItem from "../components/ListItem.vue";
import Create from "../views/Create.vue";

const routes = [
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
    component: Home,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/list",
    component: ListView,
    children: [{ path: "/list/:group", component: ListItem }],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
