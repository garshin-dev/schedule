import type {IEvent} from "@/entities/schedule/event";
import {OVERLAPPING_OFFSET} from "../../constants/sizes";

export function isEvent(events: IEvent[], date: Date, hour: string): IEvent[] | undefined {
  const hourStart = hour.split(':')[0]

  return events.filter((event) => {
    const isTimeMatch = hourStart === event.startTime.split(':')[0]
    const isDateInRange = date.getTime() >= event.startDate.getTime() && date.getTime() <= event.endDate.getTime()

    if (event.startDate.getTime() !== event.endDate.getTime()) {
      if (event.startDate.getTime() !== date.getTime()) {
        return isDateInRange && hourStart === '00'
      }
    }

    return isDateInRange && isTimeMatch
  })
}

export function overlappingOffset(events: IEvent[], event: IEvent) {
  const count = events.filter((item) => {
    const isDateInRange = event.startDate.getTime() >= item.startDate.getTime() && event.startDate.getTime() <= item.endDate.getTime()
    const isNotEqual = event.id !== item.id
    const condition =
      event.startTime >= item.startTime && item.endTime > event.startTime && isNotEqual

    if (item.startDate.getTime() !== item.endDate.getTime()) {
      if (item.startDate.getTime() !== event.startDate.getTime() && item.endDate.getTime() !== event.endDate.getTime()) {
        return true
      }

      return isDateInRange && item.endTime > event.startTime && isNotEqual
    }

    return isDateInRange && condition
  })?.length

  return count ? count * OVERLAPPING_OFFSET : 0
}
