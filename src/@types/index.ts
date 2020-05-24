export type Weekly = {
  0: DayofMenu
  1: DayofMenu
  2: DayofMenu
  3: DayofMenu
  4: DayofMenu
}

export enum Status {
  'isWeekend',
  'isWait',
  'isLoading',
  'isOK'
}

export enum Week {
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일'
}

export enum DayofTime {
  '점심',
  '저녁'
}

export type WeekStr = keyof typeof Week

export type WeekIndex = keyof Weekly

export type DayofMenu = {
  점심: Menu
  저녁: Menu
}

export type Menu = {
  정식: string[]
  특식: string[]
  양식: string[]
  중식: string[]
}
