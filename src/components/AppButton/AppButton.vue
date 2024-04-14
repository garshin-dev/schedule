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
    <slot/>
  </component>
</template>

<script setup lang="ts">
interface ButtonProps {
  type?: 'primary' | 'secondary'
  to?: string | null
  disabled?: boolean
  target?: string | null
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary'
})

const componentType = props.to ? 'RouterLink' : 'button'
</script>