<template>
  <button
    class="bg-white flex flex-col absolute left-0 top-0 size-full rounded-md anim"
    tabindex="-1"
    :class="[isHovered ? 'z-20' : 'z-10']"
    :style="{
      height: `calc(${getEventHeight(event, currentDate)}px - 1px)`,
      marginTop: `${getEventOffset(event, currentDate)}px`,
      marginLeft: `${overlappingOffset}px`,
      width: `calc(100% - ${overlappingOffset}px)`,
    }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <EventContent :event="event" :is-hovered="isHovered" />
    <span v-if="overlappingOffset" class="absolute top-1 right-1" title="Overlapping problem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { EventContent } from '@/entities/schedule/event'
import type { IEvent } from '@/entities/schedule/event'
import { getEventHeight, getEventOffset } from '../lib/sizes'

interface Props {
  event: IEvent
  overlappingOffset: number
  currentDate: Date
}

defineProps<Props>()

const isHovered = ref<boolean>(false)

const { start, stop } = useTimeoutFn(
  () => {
    isHovered.value = true
  },
  50,
  { immediate: false },
)

const onMouseOver = () => {
  start()
}

const onMouseLeave = () => {
  stop()
  isHovered.value = false
}
</script>
