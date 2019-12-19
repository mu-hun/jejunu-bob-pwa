import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

import { DayofMenu } from '../@types'

export const setData = createAction<DayofMenu, 'menu'>('menu')

// @ts-ignore
const initialState: DayofMenu = {}

export default createReducer(initialState, {
  [setData.type]: (state, action: PayloadAction<DayofMenu>) => action.payload
})
