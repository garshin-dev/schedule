import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'
import type { IEvent } from '@/entities/schedule/event'

export function getEventOffset(startTime: string) {
  const [, minutes] = startTime.split(':')
  const value = parseInt(minutes) / 60

  return value * DEFAULT_DAY_CELL_HEIGHT
}

export function getEventHeight(event: IEvent, currentDate: Date): number {
  const [startHours, startMinutes] = event.startTime.split(':').map(Number)
  const [endHours, endMinutes] = event.endTime.split(':').map(Number)

  if (event.startDate.getTime() !== event.endDate.getTime()) {
    if (event.endDate.getTime() === currentDate.getTime()) {
      return (endHours + endMinutes / 60) * DEFAULT_DAY_CELL_HEIGHT
    } else {
      return (24 - startHours - startMinutes / 60) * DEFAULT_DAY_CELL_HEIGHT
    }
  }

  return (endHours - startHours + (endMinutes - startMinutes) / 60) * DEFAULT_DAY_CELL_HEIGHT
}
