<template>
  <div class="flex flex-col w-full">
    <div
      class="grid grid-cols-7 w-full pl-14"
      :style="{ gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))` }"
    >
      <div
        v-for="date in selectedDays"
        :key="date.toString()"
        class="text-center border-b border-b-black/10 pb-2"
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
              v-for="hour in HOURS"
              :key="hour"
              class="flex uppercase text-center border-b border-b-black/10 relative"
              :style="{ height: DEFAULT_DAY_CELL_HEIGHT + 'px' }"
            >
              <Event
                v-for="event in isEvent(date, hour)"
                :key="event.id"
                :current-date="date"
                :event="event"
                :overlapping-offset="overlappingOffset(event)"
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

function isEvent(date: Date, hour: string): IEvent[] | undefined {
  const hourStart = hour.split(':')[0]

  return props.events.filter((event) => {
    const isTimeMatch = hourStart === event.startTime.split(':')[0]
    const isDateInRange = date.getTime() >= event.startDate.getTime() && date.getTime() <= event.endDate.getTime()

    if (event.startDate.getTime() !== event.endDate.getTime()) {
      if (event.startDate.getTime() !== date.getTime()) {
        return isDateInRange && hourStart === '00'
      }
    }

    return isDateInRange && isTimeMatch
  })
}

// const eventMap = computed<Record<number, Record<string, IEvent[]>>>(() => {
//   return props.events.reduce<Record<number, Record<string, IEvent[]>>>((acc, event: Event) => {
//     const timestamp = event.startDate.getTime();
//     const startTime = event.startTime.split(':')[0]
//
//     if (!acc[timestamp]) acc[timestamp] = {};
//     if (!acc[timestamp][startTime]) acc[timestamp][startTime] = [];
//     acc[timestamp][startTime].push(event);
//
//     return acc;
//   }, {} as Record<number, Record<string, IEvent[]>>);
// });

function overlappingOffset(event: IEvent) {
  const count = props.events.filter((item) => {
    const isDateInRange = event.startDate.getTime() >= item.startDate.getTime() && event.startDate.getTime() <= item.endDate.getTime()
    const isNotEqual = event.id !== item.id
    const condition =
      event.startTime >= item.startTime && item.endTime > event.startTime && isNotEqual

    if (item.startDate.getTime() !== item.endDate.getTime()) {
      if (item.startDate.getTime() !== event.startDate.getTime() && item.endDate.getTime() !== event.endDate.getTime()) {
        return true
      }

      return isDateInRange && item.endTime > event.startTime && isNotEqual
    }

    return isDateInRange && condition
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
