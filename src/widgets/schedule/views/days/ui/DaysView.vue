<template>
  <div class="flex w-full flex-col">
    <div
      class="grid w-full grid-cols-7 pl-14"
      :style="{ gridTemplateColumns: `repeat(${dates.length}, minmax(0, 1fr))` }"
    >
      <div
        v-for="date in dates"
        :key="date.toString()"
        class="border-b border-b-black/10 pb-2 text-center"
      >
        <button
          class="anim flex h-auto w-full flex-col items-center gap-1 rounded-md uppercase hover:bg-black/10"
          :class="{
            [isCurrentDay(date) ? 'text-black' : 'text-black/30 hover:text-black/50']: true,
            'pointer-events-none': dates.length === 1,
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

        <div class="flex">
          <template v-for="event in isEvent(events, date)" :key="event.id">
            <button
              v-if="isAllDayEvent(event, date)"
              :style="{
                backgroundColor: hexToRgba(event.background, 0.3),
                borderColor: isHovering ? event.background : '',
                outlineColor: event.background,
              }"
              class="anim w-full rounded-md border-2 border-transparent"
              @mouseover="isHovering = true"
              @mouseleave="isHovering = false"
            >
              {{ event.name }}
            </button>
          </template>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="flex min-w-14 flex-col items-start border-r border-r-black/10">
        <span
          v-for="hour in HOURS"
          :key="hour"
          class="flex items-start justify-center text-black/80"
          :style="{ height: DEFAULT_DAY_CELL_HEIGHT + 'px' }"
        >
          <span class="-mt-3.5">
            {{ hour }}
          </span>
        </span>
      </div>
      <div class="h-full w-full">
        <div
          class="grid w-full"
          :style="{ gridTemplateColumns: `repeat(${dates.length}, minmax(0, 1fr))` }"
        >
          <div v-for="date in dates" :key="date.toString()" class="border-r border-r-black/10">
            <div
              v-for="hour in HOURS"
              :key="hour"
              class="relative flex border-b border-b-black/10 text-center uppercase"
              :style="{ height: DEFAULT_DAY_CELL_HEIGHT + 'px' }"
            >
              <template v-for="event in isEvent(events, date, hour)" :key="event.id">
                <Event
                  v-if="!isAllDayEvent(event, date)"
                  :current-date="date"
                  :event="event"
                  :overlapping-offset="overlappingOffset(events, event, date)"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { RouteParams } from 'vue-router'
import { Event } from '@/features/schedule/event-day'
import type { IEvent } from '@/entities/schedule/event-day'
import { HOURS } from '@/shared/constants/date'
import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'
import { hexToRgba } from '@/shared/lib/color'
import { getDatesInRange, getDateByWeek, getDateByDay } from '@/shared/lib/date'
import { isCurrentDay, getDayByDate, getDayOfWeekByDate } from '../lib/date'
import { isEvent, overlappingOffset, isAllDayEvent } from '../lib/event'

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day', date: Date): void
}

defineProps<Props>()
defineEmits<Emits>()

const route = useRoute()

const isHovering = ref<boolean>(false)

const dates = ref<Date[]>([])

const displayDates = (params: RouteParams) => {
  const year = Number(params.year)
  const day = Number(params.day)

  if (day) {
    dates.value = [getDateByDay(year, day)]
    return
  }

  const week = Number(params.week)
  const startDay = Number(params.startDay)
  const endDay = Number(params.endDay)

  const limit = endDay ? endDay - startDay + 1 : startDay ? 1 : 7

  const weekDate = getDateByWeek(year, week)

  if (startDay) {
    weekDate.setDate(weekDate.getDate() + startDay - 1)
  }

  dates.value = getDatesInRange(limit, weekDate)
}

watchEffect(() => {
  displayDates(route.params)
})
</script>
