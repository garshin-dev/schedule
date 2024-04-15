export enum LayoutTypes {
  Default = 'default',
  Calendar = 'calendar',
}

export const layoutComponentName: Record<LayoutTypes, string> = {
  [LayoutTypes.Default]: 'DefaultLayout',
  [LayoutTypes.Calendar]: 'CalendarLayout',
}
