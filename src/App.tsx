import React, { Fragment, useEffect } from 'react'

import { RootState } from './store'
import { setStatus, setData } from './store/slice'

import { CssBaseline } from '@material-ui/core'
import { TodayOfWeek, Wrapper } from './components/MUI'
import List from './components/List'
import AppBar from './components/BottomNav'

import { Weekend, Waiting, NoInternet } from './components/Icons'

import { Status } from './@types'

import { useSelector, useDispatch } from 'react-redux'

import { getTime } from './api'
import fetchThunk from './store/thunk'

const statusSelector = ({ status }: RootState) => ({ status })

export default () => {
  const { status } = useSelector(statusSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStatus())
  }, [dispatch])

  switch (status) {
    case Status.IDLE:
    case Status.Wait:
      return <Waiting />
    case Status.Loading:
    case Status.Loaded:
      return <View />
    case Status.Weekend:
      return <Weekend />
    default:
      return <NoInternet />
  }
}

const dataAndTimeSelector = ({ data, time, status }: RootState) => ({
  data,
  time,
  status
})

const View = () => {
  const { data, time, status } = useSelector(dataAndTimeSelector)

  const dispatch = useDispatch()

  const { weekStr } = getTime()

  useEffect(() => {
    dispatch(fetchThunk())
  }, [dispatch])

  switch (status) {
    case Status.Loading:
      // TODO: Replace to Skleton Component
      return <Waiting />
    case Status.Loaded:
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
    default:
      throw Error('unexpect status branch')
  }
}
