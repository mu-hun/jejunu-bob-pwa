import React from 'react'

import { styled } from '@material-ui/core/styles'

import {
  List,
  ListItem,
  ListItemText,
  ExpansionPanelSummary,
  Typography,
  Paper,
  Fab,
  BottomNavigation
} from '@material-ui/core'

import {
  Info as InfoIcon,
  ExpandMore
} from '@material-ui/icons'

import { WeekStr } from '../@types'

export const Item = styled(ListItem)({
  padding: '4px 24px'
})

export const ItemText = ({ menu, type }: { menu: string[]; type: string }) => (
  <ListItemText primary={menu.join(', ')} secondary={type} />
)

export const PanelByTime = ({ time }: { time: string }) => (
  <ExpansionPanelSummary
    expandIcon={<ExpandMore />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
    <Typography>{time}</Typography>
  </ExpansionPanelSummary>
)

export const Ul = styled(List)({
  marginBottom: '2rem'
})

export const TodayOfWeek = ({ weekday }: { weekday: WeekStr }) => (
  <Typography variant="h5" style={{ padding: '2rem 2rem 2rem' }} gutterBottom>
    {weekday}
  </Typography>
)

export const Wrapper = styled(Paper)({ height: '100%' })

export const BottomNav = styled(BottomNavigation)({
  top: 'auto',
  bottom: 0,
  justifyContent: 'space-around',
  position: 'fixed',
  width: '100%'
})

export const Info = () => (
  <Fab
    color="secondary"
    aria-label="add"
    style={{
      position: 'absolute',
      zIndex: 1,
      bottom: 28,
      left: 0,
      right: 0,
      margin: '0 auto'
    }}
  >
    <InfoIcon />
  </Fab>
)
