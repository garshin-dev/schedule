<template>
  <div class="flex flex-col w-full">
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(month, i) in yearDates" :key="month.name" class="flex flex-col gap-2">
        <button class="uppercase" @click="$emit('select-month', new Date(year, i))">
          {{ month.name }}
        </button>
        <div class="flex gap-2">
          <div class="flex flex-col">
            <button
              v-for="week in month.weeks"
              :key="week.date.getTime()"
              class="h-8"
              @click="$emit('select-week', week.date)"
            >
              {{ week.num }}
            </button>
          </div>
          <div class="grid grid-cols-7 w-full">
            <button
              v-for="day in month.days"
              :key="day.getTime()"
              class="border border-black text-center -ml-px -mb-px"
              @click="$emit('select-day', day)"
            >
              {{ day.getDate() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getYearDates } from '@/widgets/schedule/views/year/lib/date'

type Emits = {
  (e: 'select-day' | 'select-week' | 'select-month', date: Date): void
}

defineEmits<Emits>()

const route = useRoute()
const params = route.params
const year = Number(params.year)

const yearDates = getYearDates(year)
</script>
