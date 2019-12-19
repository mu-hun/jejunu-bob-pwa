import React, { Fragment } from 'react'

import { PanelByTime, Ul } from './MUI'
import Menu from './Menu'

import { ExpansionPanel } from '@material-ui/core'

import { WeekDay } from '../@types'

type Prop = { todayMenus: WeekDay }

export default ({ todayMenus }: Prop) => (
  <Fragment>
    {Object.entries(todayMenus).map(([time, menus]) => (
      <Ul key={time}>
        <ExpansionPanel key={time}>
          <PanelByTime time={time} />
          <Menu menus={menus} />
        </ExpansionPanel>
      </Ul>
    ))}
  </Fragment>
)
