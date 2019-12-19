import React, { Fragment, useState, useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'

import List from './components/List'
import AppBar from './components/BottomNav'

import { getWeek, effectFetch } from './api'
import { WEEKS } from './variables'

import { WeekDay, WeekKey, WeeklyMenu } from './@types'

import { TodayOfWeek, Wrapper } from './components/MUI'

const App: React.FC = () => {
  const [weekday, setWeekday] = useState<WeekKey>('월요일')
  const [lunchOrDinner, setTime] = useState<keyof WeekDay>()
  const [todayMenus, setTodayMenu] = useState<WeekDay>()

  useEffect(() => {
    const data = getWeek()

    if (data.isWeekend || data.isWait) return

    const { index } = data
    // hack: index return any type
    setWeekday(WEEKS[index])
    setTime(lunchOrDinner as keyof WeekDay)

    effectFetch({ setState: setTodayMenu, index })
  }, [lunchOrDinner])
  return (
    <Fragment>
      <CssBaseline />
      <Wrapper square>
        <TodayOfWeek weekday={weekday} />
        {todayMenus ? <List todayMenus={todayMenus} /> : <div>LODING</div>}
      </Wrapper>
      <AppBar index={0} />
    </Fragment>
  )
}

export default App
