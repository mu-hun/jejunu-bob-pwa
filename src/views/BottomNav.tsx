import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  BottomNavigation as Navigation,
  Fab,
  BottomNavigationAction as Action
} from '@material-ui/core'

import {
  Launch as LunchIcon,
  Restaurant as DinnerIcon,
  Info as InfoIcon
} from '@material-ui/icons'

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
    justifyContent: 'space-around',
    position: 'fixed',
    width: '100%'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 28,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
})

export default function BottomNav({ index }: { index: number }) {
  const classes = useStyles()
  const [value, setValue] = useState(index)
  return (
    <Navigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.appBar}
    >
      <Action label="점심" icon={<LunchIcon />} />
      <Fab color="secondary" aria-label="add" className={classes.fabButton}>
        <InfoIcon />
      </Fab>
      <Action label="저녁" icon={<DinnerIcon color={'secondary'} />} />
    </Navigation>
  )
}
