<template>
  <div class="flex flex-col w-full">
    <div class="grid grid-cols-7 w-full" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
      <div class="text-center border-b border-b-black/10 pb-2" v-for="dayOfWeek in WEEKS" :key="dayOfWeek">
        <div
          class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim text-black"
        >
          <span>
            {{ dayOfWeek }}
          </span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-7 w-full border-l border-l-black/10" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
      <div
        v-for="date in selectedDays" :key="date.toString()"
        class="border-r border-b border-b-black/10 border-r-black/10 flex flex-col gap-1"
        :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
      >
        <template v-if="isEvent(date)">
          <button
            v-for="event in eventMap[date.getTime()].slice(0, MAX_MONTH_EVENT_COUNT)"
            :key="event.id"
            class="bg-white z-10 flex flex-col size-full rounded-md h-auto"
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <span
              class="flex flex-col items-start text-left size-full text-black px-1 py-0.5 rounded-md anim border-2 border-transparent"
              :style="{
                backgroundColor: hexToRgba(event.background, 0.3),
                borderColor: isHovered ? event.background : ''
              }"
            >
              <span class="flex gap-1 w-full">
                <span class="text-black/60">{{ event.timeStart }}</span>
                <span class="truncate">{{ event.name }}</span>
              </span>
            </span>
          </button>

          <div class="mt-auto flex gap-1 py-1 px-2">
            <button
              class="underline hover:no-underline"
              v-if="eventMap[date.getTime()].length > MAX_MONTH_EVENT_COUNT"
              @click="$emit('select-day', date)"
            >
              Show more ({{ eventMap[date.getTime()].length - MAX_MONTH_EVENT_COUNT }})
            </button>
            <button @click="$emit('select-day', date)" class="ml-auto">{{ date.getDate() }}</button>
          </div>
        </template>
        <button @click="$emit('select-day', date)" class="text-right mt-auto py-1 px-2 ml-auto" v-else>{{ date.getDate() }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {WEEKS} from "@/shared/constants/date";
import {hexToRgba} from "@/shared/lib/color";
import type { Event } from '@/entities/schedule/event'

const DEFAULT_MONTH_CELL_HEIGHT = 140
const MAX_MONTH_EVENT_COUNT = 3

const isHovered = ref<boolean>(false) // todo: delete

interface Props {
  events: Event[]
  selectedDays: Date[]
}

type Emits = {
  (e: 'select-day', date: Date): void
  (e: 'is-event', date: Date): Event
}

const props = defineProps<Props>()
defineEmits<Emits>()

const eventMap = computed<Record<number, Event[]>>(() => {
  return props.events.reduce<Record<number, Event[]>>((acc, event: Event) => {
    const timestamp = event.date.getTime();
    if (!acc[timestamp]) acc[timestamp] = [];
    acc[timestamp].push(event);
    return acc;
  }, {} as Record<number, Event[]>);
});

function isEvent(date: Date, hour?: string): Event[]|undefined { // todo: optimize
  const hourStart = hour?.split(':')?.[0]

  return props.events.filter(item => {
    const isYear = item.date.getFullYear() === date.getFullYear()
    const isMonth = item.date.getMonth() === date.getMonth()
    const isDay = item.date.getDate() === date.getDate()
    const isTime = hour ? item.timeStart.split(':')[0] === hourStart : true

    return isYear && isMonth && isDay && isTime
  })
}
</script>
