import React, { Fragment, useEffect } from 'react'

import { RootState } from './store'
import { setState } from './store/state'
import { setData } from './store/data'

import { CssBaseline } from '@material-ui/core'
import { TodayOfWeek, Wrapper } from './components/MUI'
import List from './components/List'
import AppBar from './components/BottomNav'

import { Weekend, Waiting, NoInternet } from './components/Status'

import { State } from './@types'

import { useSelector, useDispatch } from 'react-redux'

import { fetchData, getTime } from './api'

const selector = ({ state, data, time }: RootState) => ({ state, data, time })

export default () => {
  const { state } = useSelector(selector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setState())
  }, [dispatch])

  switch (state) {
    case State.isLoading:
      return <div>LODING</div>
    case State.isOK:
      return <View />
    case State.isWeekend:
      return <Weekend />
    case State.isWait:
      return <Waiting />
    default:
      return <NoInternet />
  }
}

const View = () => {
  const { data, time } = useSelector(selector)

  const dispatch = useDispatch()

  const fetching = async () => {
    dispatch(setData(await fetchData()))
  }

  const { weekStr } = getTime()

  useEffect(() => {
    fetching()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <CssBaseline />
      <Wrapper square>
        <TodayOfWeek weekday={weekStr} />
        {<List DayofTime={time} DayofMenu={data} />}
      </Wrapper>
      <AppBar target={time} />
    </Fragment>
  )
}
