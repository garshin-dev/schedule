<template>
  <span
    tabindex="0"
    class="anim flex size-full flex-col items-start overflow-hidden rounded-md border-2 border-transparent px-3 py-2 text-left text-black"
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
