import { Dispatch, SetStateAction } from 'react'
import { WeeklyMenu, WeekDay } from './@types'
import axios, { AxiosResponse } from 'axios'

const isDev = process.env.NODE_ENV === 'development'

export const fetch = (): Promise<AxiosResponse<WeeklyMenu>> =>
  axios.get(
    isDev ? 'https://meals-data.muhun.kim/dev' : 'https://meals-data.muhun.kim'
  )

type WeeklyMenuKeys = keyof WeeklyMenu
type DateNums = WeeklyMenuKeys | 5 | 6

export const effectFetch = async ({
  setState,
  index
}: {
  setState: Dispatch<SetStateAction<WeekDay | undefined>>
  index: keyof WeeklyMenu
}) => {
  setState((await fetch()).data[index])
}

type Return =
  | {
      isWeekend: true
    }
  | {
      isWeekend: false
      isWait: true
    }
  | {
      isWeekend: false
      isWait: false
      index: WeeklyMenuKeys
    }

export const getWeek = (): Return => {
  const date = new Date()
  const weekday = date.getDay() as DateNums
  const hour = date.getHours()
  const lunchOrDinner = hour < 15 ? '점심' : '저녁'

  if (weekday === 0 || weekday === 6) return { isWeekend: true }

  // if (weekday === )

  const Mon2Fri = (weekday - 1) as WeeklyMenuKeys

  if (Mon2Fri === 0 && 11 > hour) return { isWeekend: false, isWait: true }
  return { isWeekend: false, isWait: false, index: Mon2Fri }
}
