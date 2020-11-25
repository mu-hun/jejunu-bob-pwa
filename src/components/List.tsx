import React, { Fragment } from 'react'

import { useDispatch } from 'react-redux'
import { chooseTime } from '../store/slice'

import { PanelByTime, Ul } from './MUI'
import Menu from './Menu'

import { ExpansionPanel } from '@material-ui/core'

import { DayOfMenu, DayOfTime } from '../@types'

type Prop = { dayOfMenu: DayOfMenu; dayOfTime: DayOfTime }

export default ({ dayOfMenu, dayOfTime }: Prop) => {
  const dispatch = useDispatch()
  return (
    <Fragment>
      {Object.entries(dayOfMenu).map(([time, menus], index) => (
        <Ul key={time}>
          <ExpansionPanel
            expanded={dayOfTime === index}
            onChange={() => {
              dispatch(chooseTime(index))
            }}
            key={time}
          >
            <PanelByTime time={time} />
            <Menu menus={menus} />
          </ExpansionPanel>
        </Ul>
      ))}
    </Fragment>
  )
}
