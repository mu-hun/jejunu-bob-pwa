import React, { Fragment, useState } from 'react'

import { PanelByTime, Ul } from './MUI'
import Menu from './Menu'

import { ExpansionPanel } from '@material-ui/core'

import { DayofMenu, DayofTime } from '../@types'

type Prop = { DayofMenu: DayofMenu; DayofTime: DayofTime }

export default ({ DayofMenu, DayofTime }: Prop) => {
  const [expanded] = useState(DayofTime)
  return (
    <Fragment>
      {Object.entries(DayofMenu).map(([time, menus], index) => (
        <Ul key={time}>
          <ExpansionPanel expanded={expanded === index} key={time}>
            <PanelByTime time={time} />
            <Menu menus={menus} />
          </ExpansionPanel>
        </Ul>
      ))}
    </Fragment>
  )
}
