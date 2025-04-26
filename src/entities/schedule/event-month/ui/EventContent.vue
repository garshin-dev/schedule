<template>
  <span
    class="flex flex-col items-start text-left size-full text-black px-1 py-0.5 rounded-md anim border-2 border-transparent"
    :style="{
      backgroundColor: hexToRgba(event.background, 0.3),
      borderColor: isHovering ? event.background : '',
    }"
  >
    <span class="flex gap-1 w-full">
      <span class="text-black/60">{{ event.startTime }}</span>
      <span class="truncate">{{ event.name }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import type { IEvent } from '@/entities/schedule/event-day'
import { hexToRgba } from '@/shared/lib/color'

interface Props {
  event: IEvent
  isHovering: boolean
}

defineProps<Props>()
</script>
