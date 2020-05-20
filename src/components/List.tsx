import React, { Fragment } from 'react'

import { useDispatch } from 'react-redux'
import { chooseTime } from '../store/slice'

import { PanelByTime, Ul } from './MUI'
import Menu from './Menu'

import { ExpansionPanel } from '@material-ui/core'

import { DayofMenu, DayofTime } from '../@types'

type Prop = { DayofMenu: DayofMenu; DayofTime: DayofTime }

export default ({ DayofMenu, DayofTime }: Prop) => {
  const dispatch = useDispatch()
  return (
    <Fragment>
      {Object.entries(DayofMenu).map(([time, menus], index) => (
        <Ul key={time}>
          <ExpansionPanel
            expanded={DayofTime === index}
            onChange={_ => {
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
