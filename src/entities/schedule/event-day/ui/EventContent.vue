<template>
  <span
    tabindex="0"
    class="flex flex-col items-start text-left size-full text-black px-3 py-2 rounded-md anim border-2 border-transparent"
    :style="{
      backgroundColor: hexToRgba(event.background, 0.3),
      borderColor: isHovering ? event.background : '',
      outlineColor: event.background,
    }"
  >
    <span>{{ event.name }}</span>
    <span class="text-black/60">{{ event.startTime }} - {{ event.endTime }}</span>
  </span>
</template>

<script setup lang="ts">
import { hexToRgba } from '@/shared/lib/color'
import type { IEvent } from '../model/event.types'

interface Props {
  event: IEvent
  isHovering: boolean
}

defineProps<Props>()
</script>
