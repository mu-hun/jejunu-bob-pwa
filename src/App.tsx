import React, { Fragment, useState, useEffect } from 'react'

import { CssBaseline } from '@material-ui/core'

import List from './components/List'
import AppBar from './components/BottomNav'

import { DayofMenu, WeekStr, State, DayofTime } from './@types'

import { TodayOfWeek, Wrapper } from './components/MUI'
import { getState, fetchData } from './api'

const App: React.FC = () => {
  const [state] = useState(getState())
  const [dayOfMenu, setDayOfMenu] = useState<DayofMenu>()

  const fetchFunction = async () => {
    setDayOfMenu(await fetchData())
  }

  useEffect(() => {
    if (state.state !== State.isWeekend && state.state !== State.isWait)
      fetchFunction()
  }, [state.state])

  if (dayOfMenu && state.state === State.isLoaded)
    return (
      <View
        weekStr={state.weekStr}
        dayofTime={state.dayofTime}
        dayOfMenu={dayOfMenu}
      />
    )

  switch (state.state) {
    case State.isLoading:
      return <div>LODING</div>
    case State.isWeekend:
      return <div>주말</div>
    case State.isWait:
      return <div>아직 새로운 식단을 보여줄 준비가 안되어 있어요!</div>
    default:
      return <div>null</div>
  }
}

export default App

type Props = {
  weekStr: WeekStr
  dayofTime: DayofTime
  dayOfMenu: DayofMenu
}

const View = ({ weekStr, dayofTime, dayOfMenu }: Props) => (
  <Fragment>
    <CssBaseline />
    <Wrapper square>
      <TodayOfWeek weekday={weekStr} />
      {<List DayofTime={dayofTime} DayofMenu={dayOfMenu} />}
    </Wrapper>
    <AppBar index={0} />
  </Fragment>
)
