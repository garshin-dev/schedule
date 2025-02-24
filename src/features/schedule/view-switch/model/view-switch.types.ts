export enum ViewUnits {
  Day = 'day',
  Days = 'days',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export interface Option {
  name: string
  value: ViewUnits
  selected: boolean
}

export interface Params {
  year?: number
  month?: number
  week?: number
  startDay?: number
  endDay?: number
}
