<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="inline-flex items-center justify-center relative anim py-2 px-4 rounded-sm"
    :class="{
      ['bg-black hover:bg-black/90 text-white']: variant === Variants.PRIMARY,
      ['bg-tur hover:bg-tur/90 text-white']: variant === Variants.SECONDARY,
      ['border border-black text-black']: variant === Variants.OUTLINE,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
enum Variants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline'
}

interface Props {
  to?: string
  disabled?: boolean
  variant?: Variants
  loading?: boolean
}

const { to } = withDefaults(defineProps<Props>(), {
  variant: Variants.PRIMARY
})

const component = computed(() => to ? 'RouterLink' : 'button')
</script>
