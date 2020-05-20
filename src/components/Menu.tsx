import React, { Fragment } from 'react'
import { Menu } from '../@types'

import { Item, ItemText } from './MUI'

export default ({ menus }: { menus: Menu }) => (
  <Fragment>
    {Object.entries(menus).map(([type, menu]) => (
      <Item key={type} button>
        <ItemText menu={menu} type={type} />
      </Item>
    ))}
  </Fragment>
)
