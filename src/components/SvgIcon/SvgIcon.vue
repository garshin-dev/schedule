<template>
  <component
    :is="icon"
    :width="size"
    :height="size"
    :style="{ minWidth: size }"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

interface SvgIconProps {
  name: string
  size?: string
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  size: '16'
})

const icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))
</script>