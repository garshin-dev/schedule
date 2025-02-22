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
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <EventContent :event="event" :is-hovered="isHovered" />
    <span v-if="overlappingOffset" class="absolute top-0 right-0" title="Overlapping problem">
      (!)
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import type { IEvent } from '@/entities/schedule/event'
import { EventContent } from '@/entities/schedule/event'
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

const mouseOverHandler = () => {
  start()
}

const mouseLeaveHandler = () => {
  stop()
  isHovered.value = false
}
</script>
