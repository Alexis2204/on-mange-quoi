import { createRouter, createWebHistory } from 'vue-router'
import { auth } from "../../firebaseApp";

import HomeView from '../view/HomeView.vue'
import LoginView from '@/view/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  if (to.name === "home" && !user) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router