import type { RouteLocationNormalized } from 'vue-router'
import { layoutComponentName, LayoutTypes } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(route: RouteLocationNormalized) {
  const layoutName= route.meta.layout || LayoutTypes.Default
  const componentName = layoutComponentName[layoutName]
  const component = await import((`@/layouts/${componentName}`))
  route.meta.layoutComponent = component.default
}