<template>
  <div class="flex flex-col w-full">
    <div
      class="grid grid-cols-7 w-full pl-10"
      :style="{ gridTemplateColumns: `repeat(7, minmax(0, 1fr))` }"
    >
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
          v-for="number in numberOfWeeks"
          :key="number"
          class="text-black/80 flex items-center justify-center w-full"
          :style="{ height: DEFAULT_MONTH_CELL_HEIGHT + 'px' }"
        >
          <button class="anim hover:bg-black/10 rounded-full size-8 font-bold">
            {{ number }}
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
                    borderColor: isHovered ? event.background : '',
                  }"
                >
                  <span class="flex gap-1 w-full">
                    <span class="text-black/60">{{ event.startTime }}</span>
                    <span class="truncate">{{ event.name }}</span>
                  </span>
                </span>
              </button>

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
import type { IEvent } from '@/entities/schedule/event'
import { WEEKS } from '@/shared/constants/date'
import { hexToRgba } from '@/shared/lib/color'
import { getWeekNumber } from '@/shared/lib/date'
import { getMonthDates } from '../lib/date'

const props = defineProps<Props>()
defineEmits<Emits>()
const DEFAULT_MONTH_CELL_HEIGHT = 140
const MAX_MONTH_EVENT_COUNT = 3

const route = useRoute()
const params = route.params

const year = Number(params.year)
const month = Number(params.month)

const isHovered = ref<boolean>(false) // todo: delete

interface Props {
  events: IEvent[]
}

type Emits = {
  (e: 'select-day', date: Date): void
}

const displayDates = ref<Date[]>(getMonthDates(year, month))

const eventMap = computed<Record<number, IEvent[]>>(() => {
  return props.events.reduce<Record<number, IEvent[]>>(
    (acc, event: IEvent) => {
      const timestamp = event.startDate.getTime()
      if (!acc[timestamp]) acc[timestamp] = []
      acc[timestamp].push(event)
      return acc
    },
    {} as Record<number, IEvent[]>,
  )
})

const numberOfWeeks = [...new Set(displayDates.value.map((date) => getWeekNumber(date)))]
</script>
