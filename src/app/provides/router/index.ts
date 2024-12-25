import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/ui/Home.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/pages/schedule/ui/Schedule.vue'),
    },
  ],
})

export default router
