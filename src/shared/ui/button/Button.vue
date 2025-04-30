<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="anim relative inline-flex items-center justify-center rounded-lg px-4 py-2"
    :class="{
      ['bg-black text-white hover:bg-black/90']: variant === Variants.Primary,
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
