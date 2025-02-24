<template>
  <div class="flex flex-col w-full">
    <div
      class="grid grid-cols-7 w-full pl-14"
      :style="{ gridTemplateColumns: `repeat(${displayDates.length}, minmax(0, 1fr))` }"
    >
      <div
        v-for="date in displayDates"
        :key="date.toString()"
        class="text-center border-b border-b-black/10 pb-2"
      >
        <button
          class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim hover:bg-black/10"
          :class="{
            [isCurrentDay(date) ? 'text-black' : 'text-black/30 hover:text-black/50']: true,
            'pointer-events-none': displayDates.length === 1,
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
          :style="{ gridTemplateColumns: `repeat(${displayDates.length}, minmax(0, 1fr))` }"
        >
          <div
            v-for="date in displayDates"
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
                v-for="event in isEvent(events, date, hour)"
                :key="event.id"
                :current-date="date"
                :event="event"
                :overlapping-offset="overlappingOffset(events, event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isCurrentDay, getDayByDate, getDayOfWeekByDate } from '../lib/date'
import { isEvent, overlappingOffset } from '../lib/event'
import { HOURS } from '@/shared/constants/date'
import { Event } from '@/features/schedule/event'
import { type IEvent } from '@/entities/schedule/event'
import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'
import { useRoute } from 'vue-router'
import { getDatesInRange, getDateByWeek } from '@/shared/lib/date'

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day', date: Date): void
}

defineProps<Props>()
defineEmits<Emits>()

const route = useRoute()
const params = route.params

const year = Number(params.year)
const month = Number(params.month)
const week = Number(params.week)
const startDay = Number(params.startDay)
const endDay = Number(params.endDay)

const limit = endDay 
  ? endDay - startDay + 1 
  : startDay ? 1 : 7

const weekDate = getDateByWeek(year, week)

if (startDay) {
  weekDate.setDate(weekDate.getDate() + startDay - 1)
}

const displayDates = ref<Date[]>(getDatesInRange(limit, weekDate))
</script>
