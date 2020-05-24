import React, { Fragment } from 'react'
import { Menu } from '../@types'

import { ItemText } from './MUI'
import { ListItem } from '@material-ui/core'

export default ({ menus }: { menus: Menu }) => (
  <Fragment>
    {Object.entries(menus).map(([type, menu]) => (
      <ListItem style={{ padding: '4px 1rem' }} key={type} button>
        <ItemText menu={menu} type={type} />
      </ListItem>
    ))}
  </Fragment>
)
