import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router