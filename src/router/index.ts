import { createRouter, createWebHistory } from 'vue-router'
import { LayoutTypes } from '@/layouts/layouts.types'
import { beforeEach } from 'vitest'
import { loadLayoutMiddleware } from '@/router/middleware/layout.middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        layout: LayoutTypes.Calendar
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ]
})

beforeEach(loadLayoutMiddleware)

export default router
