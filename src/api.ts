import { Weekly, Status, WeekIndex, Week, WeekStr, DayofTime } from './@types'
import axios, { AxiosResponse } from 'axios'

export const getStatus = () => {
  const { weekNum, hour } = getWeekAndHour()

  if (weekNum === -1 || weekNum === 5) return Status.isWeekend

  if (weekNum === 0 && 11 > hour) return Status.isWait

  return Status.isOK
}

export const getTime = () => {
  const { weekNum, hour } = getWeekAndHour()
  return {
    weekStr: Week[weekNum as WeekIndex] as WeekStr,
    dayofTime: hour < 15 ? DayofTime['점심'] : DayofTime['저녁']
  }
}

export const fetchData = async () => {
  const index = getWeek() as WeekIndex
  return (await fetch()).data[index]
}

const getWeek = () => new Date().getDay() - 1

const getWeekAndHour = () => {
  const date = new Date()
  return { weekNum: date.getDay() - 1, hour: date.getHours() }
}

const fetch = (): Promise<AxiosResponse<Weekly>> =>
  axios.get(
    window.location.hostname === 'localhost'
      ? 'https://meals-data.muhun.kim/dev'
      : 'https://meals-data.muhun.kim'
  )
