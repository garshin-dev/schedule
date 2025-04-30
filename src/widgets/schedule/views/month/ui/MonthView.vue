<template>
  <div class="flex w-full flex-col">
    <div class="grid w-full pl-10" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
      <div
        v-for="dayOfWeek in WEEK_DAYS"
        :key="dayOfWeek"
        class="border-b border-b-black/10 pb-2 text-center"
      >
        <div
          class="anim flex h-auto w-full flex-col items-center gap-1 rounded-md text-black uppercase"
        >
          <span>
            {{ dayOfWeek }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="flex min-w-10 flex-col items-start border-r border-r-black/10">
        <div
          v-for="[week, date] in numberOfWeeks"
          :key="week"
          class="flex w-full items-center justify-center text-black/80"
          :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
        >
          <button
            class="anim size-8 rounded-full font-bold hover:bg-black/10"
            @click="$emit('select-week', date)"
          >
            {{ week }}
          </button>
        </div>
      </div>
      <div class="flex w-full flex-col">
        <div
          class="grid w-full grid-cols-7"
          :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }"
        >
          <div
            v-for="date in displayDates"
            :key="date.toString()"
            class="flex flex-col gap-1 border-r border-b border-r-black/10 border-b-black/10"
            :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
          >
            <template v-if="eventMap[date.getTime()]">
              <Event
                v-for="event in eventMap[date.getTime()].slice(0, MAX_MONTH_EVENT_COUNT)"
                :key="event.id"
                :event="event"
              />

              <div class="mt-auto flex gap-1">
                <button
                  v-if="eventMap[date.getTime()].length > MAX_MONTH_EVENT_COUNT"
                  class="px-2 py-1 underline hover:no-underline"
                  @click="$emit('select-day', date)"
                >
                  Show more ({{ eventMap[date.getTime()].length - MAX_MONTH_EVENT_COUNT }})
                </button>
                <button
                  class="anim ml-auto size-8 rounded-full font-bold hover:bg-black/10"
                  :class="isThisMonth(date, month) ? 'text-black' : 'text-black/30'"
                  @click="$emit('select-day', date)"
                >
                  {{ date.getDate() }}
                </button>
              </div>
            </template>
            <button
              v-else
              class="anim mt-auto ml-auto size-8 rounded-full font-bold hover:bg-black/10"
              :class="isThisMonth(date, month) ? 'text-black' : 'text-black/30'"
              @click="$emit('select-day', date)"
            >
              {{ date.getDate() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Event } from '@/features/schedule/event-month'
import type { IEvent } from '@/entities/schedule/event-day'
import { WEEK_DAYS } from '@/shared/constants/date'
import { getWeekNumber } from '@/shared/lib/date'
import { getMonthDates, getDatesBetween, isThisMonth } from '../lib/date'

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day' | 'select-week', date: Date): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const DEFAULT_MONTH_CELL_HEIGHT = 140
const MAX_MONTH_EVENT_COUNT = 3

const route = useRoute()
const params = route.params

const year = Number(params.year)
const month = Number(params.month)

const displayDates = ref<Date[]>(getMonthDates(year, month))

const eventMap = computed<Record<number, IEvent[]>>(() => {
  return props.events.reduce<Record<number, IEvent[]>>(
    (acc, event: IEvent) => {
      const dates = getDatesBetween(event.startDate, event.endDate)

      dates.forEach((date) => {
        const timestamp = date.getTime()

        if (!acc[timestamp]) acc[timestamp] = []
        acc[timestamp].push(event)
      })

      return acc
    },
    {} as Record<number, IEvent[]>,
  )
})

const numberOfWeeks = displayDates.value.reduce((map, date) => {
  const weekNumber = getWeekNumber(date)

  if (!map.has(weekNumber)) {
    map.set(weekNumber, date)
  }

  return map
}, new Map<number, Date>())
</script>
