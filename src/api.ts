import { Weekly, Status, WeeklyKeys, Week, WeekStr, DayOfTime } from './@types'
import axios from 'axios'

export const getStatus = () => {
  const { weekNum, hour } = getWeekAndHour()

  if (weekNum === -1 || weekNum === 5) return Status.Weekend

  if (weekNum === 0 && 11 > hour) return Status.WaitUntilTenOClock

  return Status.Loading
}

export const getTime = () => {
  const { weekNum, hour } = getWeekAndHour()
  return {
    weekStr: Week[weekNum as WeeklyKeys] as WeekStr,
    dayOfTime: hour < 15 ? DayOfTime['점심'] : DayOfTime['저녁']
  }
}

const getWeekAndHour = () => {
  const date = new Date()
  return { weekNum: date.getDay() - 1, hour: date.getHours() }
}

export const fetchData = () => {
  const { hostname } = window.location

  const isPreview =
    hostname.match(/^(deploy-preview-)\d.(--jejunu-bob.netlify.app)$/) !== null

  let URL: string

  if (hostname === 'bob.muhun.kim') {
    URL = 'https://meals-data.muhun.kim'
  } else if (isPreview) {
    URL = 'https://meals-data.muhun.kim/test'
  } else if (hostname === 'localhost') {
    URL = 'https://meals-data.muhun.kim/dev'
  } else {
    throw Error('This hostname is not allowed.')
  }

  return axios.get<Weekly>(URL)
}
