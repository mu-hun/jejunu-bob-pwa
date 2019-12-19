import React, { Fragment } from 'react'
import { Menus } from '../@types'

import { Item, ItemText } from './MUI'
type Prop = {
  menus: Menus
}

export default ({ menus }: Prop) => (
  <Fragment>
    {Object.entries(menus as Menus).map(([type, menu]) => (
      // @ts-ignore
      <Item key={type}>
        <ItemText menu={menu} type={type} />
      </Item>
    ))}
  </Fragment>
)
