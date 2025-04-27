<template>
  <div class="flex flex-col w-full">
    <div class="grid w-full pl-10" :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }">
      <div
        v-for="dayOfWeek in WEEKS"
        :key="dayOfWeek"
        class="text-center border-b border-b-black/10 pb-2"
      >
        <div
          class="uppercase w-full h-auto flex flex-col gap-1 items-center rounded-md anim text-black"
        >
          <span>
            {{ dayOfWeek }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="flex flex-col items-start border-r border-r-black/10 min-w-10">
        <div
          v-for="[week, date] in numberOfWeeks"
          :key="week"
          class="text-black/80 flex items-center justify-center w-full"
          :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
        >
          <button
            class="anim hover:bg-black/10 rounded-full size-8 font-bold"
            @click="$emit('select-week', date)"
          >
            {{ week }}
          </button>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div
          class="grid grid-cols-7 w-full"
          :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }"
        >
          <div
            v-for="date in displayDates"
            :key="date.toString()"
            class="border-r border-b border-b-black/10 border-r-black/10 flex flex-col gap-1"
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
                  class="underline hover:no-underline py-1 px-2"
                  @click="$emit('select-day', date)"
                >
                  Show more ({{ eventMap[date.getTime()].length - MAX_MONTH_EVENT_COUNT }})
                </button>
                <button
                  class="ml-auto anim hover:bg-black/10 rounded-full size-8 font-bold"
                  @click="$emit('select-day', date)"
                >
                  {{ date.getDate() }}
                </button>
              </div>
            </template>
            <button
              v-else
              class="mt-auto ml-auto anim hover:bg-black/10 rounded-full size-8 font-bold"
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
import { WEEKS } from '@/shared/constants/date'
import { getWeekNumber } from '@/shared/lib/date'
import { getMonthDates, getDatesBetween } from '../lib/date'

const props = defineProps<Props>()
defineEmits<Emits>()
const DEFAULT_MONTH_CELL_HEIGHT = 140
const MAX_MONTH_EVENT_COUNT = 3

const route = useRoute()
const params = route.params

const year = Number(params.year)
const month = Number(params.month)

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day' | 'select-week', date: Date): void
}

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
