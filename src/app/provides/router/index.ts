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
      children: [
        {
          path: 'year/:year',
          name: 'schedule-year',
          component: () => import('@/pages/schedule/ui/Schedule.vue'),
        },
        {
          path: 'month/:year/:month',
          name: 'schedule-month',
          component: () => import('@/pages/schedule/ui/Schedule.vue'),
        },
        {
          path: 'week/:year/:week',
          name: 'schedule-week',
          component: () => import('@/pages/schedule/ui/Schedule.vue'),
        },
        {
          path: 'days/:year/:week/:startDay/:endDay?',
          name: 'schedule-days',
          component: () => import('@/pages/schedule/ui/Schedule.vue'),
        },
      ],
    },
  ],
})

export default router
