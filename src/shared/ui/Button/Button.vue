<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="inline-flex items-center justify-center relative anim py-2 px-4 rounded-lg"
    :class="{
      ['bg-black hover:bg-black/90 text-white']: variant === Variants.Primary,
      ['bg-tur hover:bg-tur/90 text-white']: variant === Variants.Secondary,
      ['border border-black text-black']: variant === Variants.outline,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
enum Variants {
  Primary = 'primary',
  Secondary = 'secondary',
  outline = 'outline',
}

interface Props {
  to?: string
  disabled?: boolean
  variant?: Variants
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: Variants.Primary,
})

const component = computed(() => (props.to ? 'RouterLink' : 'button'))
</script>
