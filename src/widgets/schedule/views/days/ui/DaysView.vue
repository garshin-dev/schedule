<template>
  <div class="flex flex-col w-full">
    <div
      class="grid grid-cols-7 w-full pl-14"
      :style="{ gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))` }"
    >
      <div
        class="text-center border-b border-b-black/10 pb-2"
        v-for="date in selectedDays"
        :key="date.toString()"
      >
        <button
          class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim hover:bg-black/10"
          :class="{
            [isCurrentDay(date) ? 'text-black' : 'text-black/30 hover:text-black/50']: true,
            'pointer-events-none': selectedDays.length === 1,
          }"
          @click="$emit('select-day', date)"
        >
          <span class="text-4xl font-bold">
            {{ getDayByDate(date) }}
          </span>
          <span>
            {{ getDayOfWeekByDate(date) }}
          </span>
        </button>
      </div>
    </div>
    <div class="flex w-full">
      <div class="flex flex-col items-start border-r border-r-black/10 min-w-14">
        <span
          v-for="hour in HOURS"
          :key="hour"
          class="text-black/80 flex items-start justify-center"
          :style="{ height: DEFAULT_DAY_CELL_HEIGHT + 'px' }"
        >
          <span class="-mt-3.5">
            {{ hour }}
          </span>
        </span>
      </div>
      <div class="w-full h-full">
        <div
          class="grid grid-cols-7 w-full"
          :style="{ gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))` }"
        >
          <div
            v-for="date in selectedDays"
            :key="date.toString()"
            class="border-r border-r-black/10"
          >
            <div
              class="flex uppercase text-center border-b border-b-black/10 relative"
              :style="{ height: DEFAULT_DAY_CELL_HEIGHT + 'px' }"
              v-for="hour in HOURS"
              :key="hour"
            >
              <Event
                :event="event"
                :overlapping-offset="overlappingOffset(event)"
                v-for="event in isEvent(date, hour)"
                :key="event.id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HOURS, WEEKS } from '@/shared/constants/date'
import { Event } from '@/features/schedule/event'
import { type IEvent } from '@/entities/schedule/event'
import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'

interface Props {
  events: IEvent[]
  selectedDays: Date[]
}

type Emits = {
  (e: 'select-day', date: Date): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const OVERLAPPING_OFFSET = 25

function isEvent(date: Date, hour?: string): IEvent[] | undefined {
  // todo: optimize
  const hourStart = hour?.split(':')?.[0]

  return props.events.filter((item) => {
    const isYear = item.date.getFullYear() === date.getFullYear()
    const isMonth = item.date.getMonth() === date.getMonth()
    const isDay = item.date.getDate() === date.getDate()
    const isTime = hour ? item.timeStart.split(':')[0] === hourStart : true

    return isYear && isMonth && isDay && isTime
  })
}

// const eventMap = computed<Record<number, Record<string, IEvent[]>>>(() => {
//   return props.events.reduce<Record<number, Record<string, IEvent[]>>>((acc, event: Event) => {
//     const timestamp = event.date.getTime();
//     const timeStart = event.timeStart.split(':')[0]
//
//     if (!acc[timestamp]) acc[timestamp] = {};
//     if (!acc[timestamp][timeStart]) acc[timestamp][timeStart] = [];
//     acc[timestamp][timeStart].push(event);
//
//     return acc;
//   }, {} as Record<number, Record<string, IEvent[]>>);
// });

function overlappingOffset(event: IEvent) {
  const count = props.events.filter((item) => {
    const isYear = item.date.getFullYear() === event.date.getFullYear()
    const isMonth = item.date.getMonth() === event.date.getMonth()
    const isDay = item.date.getDate() === event.date.getDate()

    const condition =
      event.timeStart >= item.timeStart && item.timeEnd > event.timeStart && event.id !== item.id

    return isYear && isMonth && isDay && condition
  })?.length

  return count ? count * OVERLAPPING_OFFSET : 0
}

function getDayByDate(date: Date) {
  return date.getDate()
}

function getDayOfWeekByDate(date: Date) {
  const day = date.getDay()

  return WEEKS[day === 0 ? 6 : day - 1]
}

function isCurrentDay(date: Date) {
  const today = new Date()

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
</script>
