import { LayoutTypes } from '@/layouts/layouts.types'
import type { VueElement } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutTypes
    layoutComponent?: VueElement
  }
}
