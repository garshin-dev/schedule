<template>
  <component v-if="icon" :is="icon" :width="size" :height="size" :style="{ minWidth: size }" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watchEffect } from 'vue'

interface SvgIconProps {
  name: string
  size?: string
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  size: '16',
})

type AsyncIconComponent = ReturnType<typeof defineAsyncComponent>

const icon = ref<AsyncIconComponent | any>(null)

const loadIcon = () => {
  icon.value = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))
}

watchEffect(() => {
  if (props.name) {
    loadIcon()
  }
})
</script>
