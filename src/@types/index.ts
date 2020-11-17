export type Weekly = {
  0: DayOfMenu
  1: DayOfMenu
  2: DayOfMenu
  3: DayOfMenu
  4: DayOfMenu
}

export type WeeklyKeys = keyof Weekly

export enum Status {
  Weekend,
  WaitUntilTenOClock,
  Loading,
  Loaded,
  Error
}

export enum Week {
  월요일,
  화요일,
  수요일,
  목요일,
  금요일
}

export enum DayOfTime {
  점심,
  저녁
}

export type WeekStr = keyof typeof Week

export type DayOfMenu = {
  점심: Menu
  저녁: Menu
}

export type Menu = {
  정식: string[]
  특식: string[]
  양식: string[]
  중식: string[]
}
