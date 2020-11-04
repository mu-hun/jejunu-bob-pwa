import React, { Fragment, useEffect } from 'react'

import { RootState } from './store'

import { CssBaseline } from '@material-ui/core'
import { TodayOfWeek, Wrapper } from './components/MUI'
import List from './components/List'
import AppBar from './components/BottomNav'
import Skeletons from './components/Skeletons'

import { Weekend, Waiting, RequestError } from './components/Icons'

import { Status, Week } from './@types'

import { useSelector, useDispatch } from 'react-redux'

import fetchThunk from './store/thunk'

const statusSelector = ({ status }: RootState) => ({ status })

export default () => {
  const { status } = useSelector(statusSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status !== Status.Weekend && status !== Status.WaitUntillTenOClock)
      dispatch(fetchThunk())
  }, [dispatch])

  switch (status) {
    case Status.WaitUntillTenOClock:
      return <Waiting />
    case Status.Loading:
      return <Skeletons />
    case Status.Loaded:
      return <View />
    case Status.Weekend:
      return <Weekend />
    case Status.Error:
      return <RequestError />
    default:
      throw Error('unexpected status')
  }
}

const dataAndTimeSelector = ({ data, time, selectedDay }: RootState) => ({
  data,
  time,
  selectedDay
})

const View = () => {
  const { data, time, selectedDay } = useSelector(dataAndTimeSelector)

  const dispatch = useDispatch()

  return (
    <Fragment>
      <CssBaseline />
      <Wrapper square>
        <TodayOfWeek weekday={Week[selectedDay]} />
        <List DayofTime={time} DayofMenu={data[selectedDay]} />
      </Wrapper>
      <AppBar target={time} />
    </Fragment>
  )
}
