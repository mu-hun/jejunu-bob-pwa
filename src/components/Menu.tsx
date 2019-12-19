import React, { Fragment } from 'react'
import { Menu } from '../@types'

import { Item, ItemText } from './MUI'
type Prop = {
  menus: Menu
}

export default ({ menus }: Prop) => (
  <Fragment>
    {Object.entries(menus).map(([type, menu]) => (
      // @ts-ignore
      <Item key={type}>
        <ItemText menu={menu} type={type} />
      </Item>
    ))}
  </Fragment>
)
