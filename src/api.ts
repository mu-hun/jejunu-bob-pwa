import { Weekly, Status, WeeklyKeys, Week, WeekStr, DayofTime } from './@types'
import axios, { AxiosResponse } from 'axios'

export const getStatus = () => {
  const { weekNum, hour } = getWeekAndHour()

  if (weekNum === -1 || weekNum === 5) return Status.Weekend

  if (weekNum === 0 && 11 > hour) return Status.WaitUntillTenOClock

  return Status.Loading
}

export const getTime = () => {
  const { weekNum, hour } = getWeekAndHour()
  return {
    weekStr: Week[weekNum as WeeklyKeys] as WeekStr,
    dayofTime: hour < 15 ? DayofTime['점심'] : DayofTime['저녁']
  }
}

const getWeekAndHour = () => {
  const date = new Date()
  return { weekNum: date.getDay() - 1, hour: date.getHours() }
}

export const fetchData = () =>
  axios.get<Weekly>(
    window.location.hostname === 'localhost'
      ? 'https://meals-data.muhun.kim/dev'
      : 'https://meals-data.muhun.kim'
  )
