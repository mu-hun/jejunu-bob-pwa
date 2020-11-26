import React, { Fragment } from 'react'
import {
  makeStyles,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

import { TransitionProps } from '@material-ui/core/transitions'

import licenseList from '../tools/license/list.json'

const { latest } = licenseList

interface DialogProps {
  open: boolean
  handleClose: () => void
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function({ open, handleClose }: DialogProps) {
  const classes = useStyles()
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            사용한 오픈소스
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {latest.map(({ name, license }, index) => (
          <Fragment key={name}>
            <ListItem>
              <ListItemText primary={name} secondary={license} />
            </ListItem>
            {latest.length - 1 !== index && <Divider light />}
          </Fragment>
        ))}
      </List>
    </Dialog>
  )
}
