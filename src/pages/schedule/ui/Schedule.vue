<template>
  <div class="flex flex-col items-start px-3 py-4">
    <div class="mb-4 flex items-center gap-8">
      <ViewSwitch />

      <div class="flex gap-4">
        <div v-if="params.year" class="flex gap-2">
          <span>Year:</span>
          <span>{{ params.year }}</span>
        </div>

        <div v-if="params.month" class="flex gap-2">
          <span>Month:</span>
          <span class="uppercase">{{ MONTHS[Number(params.month)] }}</span>
        </div>

        <div v-if="params.week" class="flex gap-2">
          <span>Week:</span>
          <span>{{ params.week }}</span>
        </div>

        <div v-if="params.startDay" class="flex gap-2">
          <span>startDay:</span>
          <span>{{ params.startDay }}</span>
        </div>

        <div v-if="params.endDay" class="flex gap-2">
          <span>endDay:</span>
          <span>{{ params.endDay }}</span>
        </div>

        selectedView: {{ selectedView }}
        <br />
      </div>
    </div>

    <YearView
      v-if="selectedView.value === ViewUnits.Year"
      :events="MOCK_EVENTS"
      @select-day="onSelectDay"
      @select-week="onSelectWeek"
      @select-month="onSelectMonth"
    />
    <MonthView
      v-else-if="selectedView.value === ViewUnits.Month"
      :events="MOCK_EVENTS"
      @select-day="onSelectDay"
      @select-week="onSelectWeek"
    />
    <DaysView v-else :events="MOCK_EVENTS" @select-day="onSelectDay" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DaysView } from '@/widgets/schedule/views/days'
import { MonthView } from '@/widgets/schedule/views/month'
import { YearView } from '@/widgets/schedule/views/year'
import { ViewSwitch, useViewSwitch, ViewUnits } from '@/features/schedule/view-switch'
import type { IEvent } from '@/entities/schedule/event-day'
import { MONTHS } from '@/shared/constants/date'
import { showDay, showWeek, showMonth } from '../lib/date'

const { selectedView } = useViewSwitch()

const route = useRoute()
const router = useRouter()
const params = route.params

const MOCK_EVENTS: IEvent[] = [
  {
    id: 1,
    name: 'Weekly team meeting',
    startDate: new Date('2025.04.20'),
    endDate: new Date('2025.04.20'),
    startTime: '03:00',
    endTime: '04:30',
    background: '#fa934b',
  },
  {
    id: 111,
    name: 'Weekly team me!!!!!',
    startDate: new Date('2025.04.20'),
    endDate: new Date('2025.04.20'),
    startTime: '03:30',
    endTime: '05:25',
    background: '#fac34b',
  },
  {
    id: 2,
    name: 'Some event',
    startDate: new Date('2025.04.20'),
    endDate: new Date('2025.04.20'),
    startTime: '09:25',
    endTime: '12:10',
    background: '#3bbd00',
  },
  {
    id: 3,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.04.21'),
    endDate: new Date('2025.04.21'),
    startTime: '08:15',
    endTime: '14:25',
    background: '#d11c91',
  },
  {
    id: 4,
    name: 'Weekly team meeting',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '03:00',
    endTime: '04:30',
    background: '#fa934b',
  },
  {
    id: 5,
    name: 'Weekly team meeting',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '09:25',
    endTime: '12:10',
    background: '#3bbd00',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '07:15',
    endTime: '11:30',
    background: '#d11c91',
  },
  {
    id: 6,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '14:15',
    endTime: '17:30',
    background: '#d1ad1c',
  },
  {
    id: 7,
    name: 'Weekly team meeting 2',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '12:15',
    endTime: '19:45',
    background: '#d1521c',
  },
  {
    id: 8,
    name: 'Weekly team meeting 23',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '18:10',
    endTime: '19:25',
    background: '#1cd1a1',
  },
  {
    id: 9,
    name: 'Weekly team meeting 7',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '16:00',
    endTime: '17:00',
    background: '#ff4949',
  },
  {
    id: 10,
    name: 'Weekly team meeting',
    startDate: new Date('2025.04.22'),
    endDate: new Date('2025.04.22'),
    startTime: '17:15',
    endTime: '18:10',
    background: '#3bbd30',
  },
  {
    id: 11,
    name: 'Long',
    startDate: new Date('2025.04.21'),
    endDate: new Date('2025.04.23'),
    startTime: '22:15',
    endTime: '03:40',
    background: '#2b3e3c',
  },
  {
    id: 13,
    name: 'Weekly team meeting 7',
    startDate: new Date('2025.04.23'),
    endDate: new Date('2025.04.23'),
    startTime: '00:00',
    endTime: '03:40',
    background: '#641cd1',
  },
  {
    id: 12,
    name: 'Weekly team meeting 7',
    startDate: new Date('2025.04.23'),
    endDate: new Date('2025.04.23'),
    startTime: '08:15',
    endTime: '12:45',
    background: '#d1521c',
  },
]

const onSelectDay = (date: Date) => {
  showDay(date, router)
}

const onSelectWeek = (date: Date) => {
  showWeek(date, router)
}

const onSelectMonth = (date: Date) => {
  showMonth(date, router)
}
</script>
