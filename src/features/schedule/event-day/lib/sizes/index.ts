import type { IEvent } from '@/entities/schedule/event-day'
import { DEFAULT_DAY_CELL_HEIGHT } from '@/shared/constants/sizes'

export function getEventOffset(event: IEvent, currentDate: Date) {
  if (event.startDate.getTime() !== event.endDate.getTime()) {
    if (event.startDate.getTime() !== currentDate.getTime()) {
      return 0
    }
  }

  const [, minutes] = event.startTime.split(':')
  const value = parseInt(minutes) / 60

  return value * DEFAULT_DAY_CELL_HEIGHT
}

export function getEventHeight(event: IEvent, currentDate: Date): number {
  const [startHours, startMinutes] = event.startTime.split(':').map(Number)
  const [endHours, endMinutes] = event.endTime.split(':').map(Number)

  if (event.startDate.getTime() !== event.endDate.getTime()) {
    if (event.startDate.getTime() === currentDate.getTime()) {
      return (24 - startHours - startMinutes / 60) * DEFAULT_DAY_CELL_HEIGHT
    } else if (event.endDate.getTime() === currentDate.getTime()) {
      return (endHours + endMinutes / 60) * DEFAULT_DAY_CELL_HEIGHT
    } else {
      return 24 * DEFAULT_DAY_CELL_HEIGHT
    }
  }

  return (endHours - startHours + (endMinutes - startMinutes) / 60) * DEFAULT_DAY_CELL_HEIGHT
}
