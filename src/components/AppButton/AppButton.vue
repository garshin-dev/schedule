<template>
  <component
    :is="componentType"
    :to="to"
    :disabled="disabled"
    :target="target"
    class="py-2 px-4 text-white"
    :class="{
      'bg-blue-400 hover:bg-blue-700': type === 'primary',
      'bg-red-400 hover:bg-red-700': type === 'secondary'
    }"
  >
    <SvgIcon
      v-if="icon"
      :name="icon"
    />
    <slot/>
  </component>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon'

interface ButtonProps {
  type?: 'primary' | 'secondary'
  to?: string | null
  disabled?: boolean
  target?: string | null
  icon?: string | null
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary'
})

const componentType = props.to ? 'RouterLink' : 'button'
</script>