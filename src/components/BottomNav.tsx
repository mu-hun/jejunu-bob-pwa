import React from 'react'

import { BottomNav, Info, Dinner, Lunch } from './MUI'

export default function({ index }: { index: number }) {
  return (
    <BottomNav
      // @ts-ignore
      value={index}
      //   onChange={}
      showLabels
    >
      <Lunch />
      <Info />
      <Dinner />
    </BottomNav>
  )
}
