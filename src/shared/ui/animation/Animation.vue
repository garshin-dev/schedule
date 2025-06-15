<template>
  <div
    class="loader animate-l3 absolute inset-0 bg-[length:200%_100%] bg-left"
    :style="{
      backgroundImage: `repeating-linear-gradient(-45deg, ${color} 0 8px, transparent 0 14px)`,
    }"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  transparent?: boolean
}

const props = defineProps<Props>()

const color = computed(() =>
  props.transparent ? 'rgba(var(--color-blue-rgb), 0.3)' : 'var(--color-blue)',
)
</script>

<style>
.loader {
  animation: animation 2s infinite linear;
}

@keyframes animation {
  100% {
    background-position: right;
  }
}
</style>
