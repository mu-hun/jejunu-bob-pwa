import React, { Fragment, useState, useEffect } from 'react'
import {
  CssBaseline,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { getWeek, effectFetch } from './api'
import { WEEKS } from './variables'

import AppBar from './views/BottomNav'
import { WeekDay, WeekKey, WeeklyMenu } from './@types'

import {
  appStyles
  //	panelStyle // 'heading' 속성이 추론되지 않고 있음
} from './styles'

const App: React.FC = () => {
  const classes = appStyles()
  const [weekday, setWeekday] = useState<WeekKey>('월요일')
  const [lunchOrDinner, setTime] = useState<keyof WeekDay>()
  const [todayMenus, setTodayMenu] = useState<WeekDay>()

  useEffect(() => {
    const data = getWeek()

    if (data.isWeekend || data.isWait) return

    const { index } = data
    // hack: index return any type
    setWeekday(WEEKS[index as keyof WeeklyMenu])
    setTime(lunchOrDinner as keyof WeekDay)

    effectFetch({ setState: setTodayMenu, index })
  }, [])
  return (
    <Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          {weekday}
        </Typography>
        {todayMenus ? (
          <List className={classes.list}>
            {Object.entries(todayMenus).map(([time, menus]) => (
              <ExpansionPanel key={time}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{time}</Typography>
                </ExpansionPanelSummary>
                {Object.entries(menus).map(([type, menu]) => (
                  <ListItem style={{ padding: '4px 24px' }}>
                    <ListItemText primary={menu.join(', ')} secondary={type} />
                  </ListItem>
                ))}
              </ExpansionPanel>
            ))}
          </List>
        ) : (
          <div>LODING</div>
        )}
      </Paper>
      <AppBar index={0} />
    </Fragment>
  )
}

export default App
