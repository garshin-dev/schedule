import type { IEvent } from '@/entities/schedule/event-day'
import { OVERLAPPING_OFFSET } from '../../constants/sizes'

export function isEvent(events: IEvent[], date: Date, hour?: string): IEvent[] | undefined {
  if (hour) {
    const hourStart = hour.split(':')[0]

    return events.filter((event) => {
      const isTimeMatch = hourStart === event.startTime.split(':')[0]
      const isDateInRange =
        date.getTime() >= event.startDate.getTime() && date.getTime() <= event.endDate.getTime()

      if (event.startDate.getTime() !== event.endDate.getTime()) {
        if (event.startDate.getTime() !== date.getTime()) {
          return isDateInRange && hourStart === '00'
        }
      }

      return isDateInRange && isTimeMatch
    })
  }

  return events.filter((event) => {
    return date.getTime() >= event.startDate.getTime() && date.getTime() <= event.endDate.getTime()
  })
}

export function isAllDayEvent(event: IEvent, date: Date): boolean {
  if (event.startDate.getTime() === date.getTime() && event.startTime !== '00:00') {
    return false
  }

  return event.endDate.getTime() - date.getTime() >= 86400000
}

export function overlappingOffset(events: IEvent[], event: IEvent, date: Date): number {
  const count = events.filter((item) => {
    if (event.id === item.id || isAllDayEvent(item, date)) return false

    const isDateInRange =
      event.startDate.getTime() >= item.startDate.getTime() &&
      event.startDate.getTime() <= item.endDate.getTime()
    const condition = event.startTime >= item.startTime && item.endTime > event.startTime

    if (isDateInRange && item.startDate.getTime() !== item.endDate.getTime()) {
      if (
        item.startDate.getTime() !== event.startDate.getTime() &&
        item.endDate.getTime() !== event.endDate.getTime()
      ) {
        return true
      } else if (item.startDate.getTime() === event.startDate.getTime()) {
        return event.startTime > item.startTime
      }

      return item.endTime > event.startTime
    }

    return isDateInRange && condition
  })?.length

  return count ? count * OVERLAPPING_OFFSET : 0
}
