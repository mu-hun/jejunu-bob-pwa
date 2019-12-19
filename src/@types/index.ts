export type WeeklyMenu = {
  0: WeekDay
  1: WeekDay
  2: WeekDay
  3: WeekDay
  4: WeekDay
}

export enum Weeks {
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일'
}

export type WeekKey = keyof typeof Weeks

export type WeekDay = {
  점심: Menus
  저녁: Menus
}

export type Menus = {
  정식: string[]
  특식: string[]
  양식: string[]
  중식: string[]
}
