<template>
  <button
    class="bg-white z-10 flex flex-col size-full rounded-md h-auto"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <EventContent :event="event" :is-hovering="isHovering" />
  </button>
</template>

<script setup lang="ts">
import type { IEvent } from '@/entities/schedule/event-day'
import { EventContent } from '@/entities/schedule/event-month'

interface Props {
  event: IEvent
}

defineProps<Props>()

const isHovering = ref<boolean>(false)
</script>
