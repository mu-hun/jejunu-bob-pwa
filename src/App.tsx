import React, { Fragment, useEffect } from 'react'

import { RootState } from './store'
import { setStatus } from './store/state'
import { setData } from './store/data'

import { CssBaseline } from '@material-ui/core'
import { TodayOfWeek, Wrapper } from './components/MUI'
import List from './components/List'
import AppBar from './components/BottomNav'

import { Weekend, Waiting, NoInternet } from './components/Icons'

import { Status } from './@types'

import { useSelector, useDispatch } from 'react-redux'

import { fetchData, getTime } from './api'

const selector = ({ status, data, time }: RootState) => ({ status, data, time })

export default () => {
  const { status } = useSelector(selector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStatus())
  }, [dispatch])

  switch (status) {
    case Status.isLoading:
      return <div>LODING</div>
    case Status.isOK:
      return <View />
    case Status.isWeekend:
      return <Weekend />
    case Status.isWait:
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
