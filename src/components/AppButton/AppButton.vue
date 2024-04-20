<template>
  <component
    :is="componentType"
    :to="to"
    :disabled="disabled"
    :target="target"
    class="inline-flex items-center gap-2 rounded px-4 py-2 text-white transition duration-300"
    :class="{
      'bg-blue hover:bg-blue-hover': type === 'primary',
      'bg-black hover:bg-black-hover': type === 'secondary',
      'bg-red hover:bg-red-hover': type === 'danger',
    }"
  >
    <SvgIcon v-if="icon" :name="icon" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger'
  to?: string | null
  disabled?: boolean
  target?: string | null
  icon?: string | null
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
})

const componentType = props.to ? 'RouterLink' : 'button'
</script>
