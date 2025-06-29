<template>
  <div class="flex w-full flex-col">
    <div class="grid grid-cols-4 gap-8">
      <div v-for="(month, i) in yearDates" :key="month.name" class="flex flex-col gap-2">
        <button
          class="anim relative rounded bg-black/10 uppercase hover:bg-black hover:text-white"
          @click="$emit('select-month', new Date(year, i))"
        >
          {{ month.name }}
        </button>
        <div class="grid w-full grid-cols-7 pl-10">
          <span v-for="weekDay in WEEK_DAYS" :key="weekDay" class="text-center uppercase">
            {{ weekDay.slice(0, 3) }}
          </span>
        </div>
        <div class="flex gap-2">
          <div class="flex flex-col gap-3">
            <button
              v-for="week in month.weeks"
              :key="week.date.getTime()"
              class="anim h-8 w-8 rounded-full bg-black/10 hover:bg-black hover:text-white"
              @click="$emit('select-week', week.date)"
            >
              {{ week.num }}
            </button>
          </div>
          <div class="grid w-full grid-cols-7">
            <button
              v-for="day in month.days"
              :key="day.getTime()"
              class="anim relative -mb-px -ml-px border border-black p-2 text-center font-bold hover:text-white"
              :class="[isCurrentDay(day) ? 'hover:bg-blue bg-blue/20' : 'hover:bg-black']"
              @click="$emit('select-day', day)"
            >
              <span class="relative z-10">{{ day.getDate() }}</span>

              <Animation v-if="isCurrentDay(day)" transparent />
              <template v-if="eventMap[day.getTime()]">
                <span class="absolute top-0 left-0 flex flex-wrap gap-px">
                  <span
                    v-for="event in eventMap[day.getTime()]"
                    :key="event.id"
                    :style="{ background: event.background }"
                    class="block size-1.5 rounded-full"
                  />
                </span>
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { RouteParams } from 'vue-router'
import { isCurrentDay } from '@/widgets/schedule/views/days/lib/date'
import type { IEvent } from '@/entities/schedule/event-day'
import { WEEK_DAYS } from '@/shared/constants/date'
import { getDatesBetween } from '@/shared/lib/date'
import { getYearDates } from '../lib/date'
import type { YearDates } from '../lib/date'

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day' | 'select-week' | 'select-month', date: Date): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const route = useRoute()
const params = route.params
const year = Number(params.year)

const yearDates = ref<YearDates[]>(getYearDates(year))

const displayDates = (params: RouteParams) => {
  const year = +params.year
  yearDates.value = getYearDates(year)
}

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

watch(
  () => route.params,
  (params) => displayDates(params),
)
</script>
