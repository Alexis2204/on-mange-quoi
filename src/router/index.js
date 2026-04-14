import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../view/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router