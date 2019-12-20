import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

import { getTime } from '../api'
import { DayofTime } from '../@types'

export const chooseTime = createAction<DayofTime, 'setTime'>('setTime')

const { dayofTime } = getTime()

export default createReducer(dayofTime, {
  [chooseTime.type]: (state, action: PayloadAction<DayofTime>) => action.payload
})
