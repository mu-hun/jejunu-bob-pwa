import React, { Fragment, useEffect } from 'react'

import { RootState } from './store'
import { setState } from './store/state'
import { setData } from './store/data'

import { CssBaseline } from '@material-ui/core'
import { TodayOfWeek, Wrapper } from './components/MUI'
import List from './components/List'
import AppBar from './components/BottomNav'

import { State } from './@types'

import { useSelector, useDispatch } from 'react-redux'

import { fetchData, getTime } from './api'

const selector = ({ state, data }: RootState) => ({ state, data })

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
      return <div>주말</div>
    case State.isWait:
      return <div>아직 새로운 식단을 보여줄 준비가 안되어 있어요!</div>
    default:
      return <div>실패</div>
  }
}

const View = () => {
  const { data } = useSelector(selector)

  const dispatch = useDispatch()

  const fetching = async () => {
    dispatch(setData(await fetchData()))
  }

  const { weekStr, dayofTime } = getTime()

  useEffect(() => {
    fetching()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <CssBaseline />
      <Wrapper square>
        <TodayOfWeek weekday={weekStr} />
        {<List DayofTime={dayofTime} DayofMenu={data} />}
      </Wrapper>
      <AppBar index={0} />
    </Fragment>
  )
}
