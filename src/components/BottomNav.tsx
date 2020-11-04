import React from 'react'

import { BottomNavigationAction as Action } from '@material-ui/core'

import {
  Launch as LunchIcon,
  Restaurant as DinnerIcon
} from '@material-ui/icons'

import { BottomNav, Info } from './MUI'

import { DayOfTime } from '../@types'
import { useDispatch } from 'react-redux'
import { chooseTime } from '../store/slice'

export default ({ target }: { target: DayOfTime }) => {
  const dispatch = useDispatch()
  return (
    <BottomNav
      value={target}
      onChange={(event, newValue) => {
        dispatch(chooseTime(newValue))
      }}
      showLabels
    >
      <Action label="점심" icon={<LunchIcon />} value={DayOfTime['점심']} />
      <Info />
      <Action label="저녁" icon={<DinnerIcon />} value={DayOfTime['저녁']} />
    </BottomNav>
  )
}
