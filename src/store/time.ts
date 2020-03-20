import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getTime } from '../api'
import { DayofTime } from '../@types'

const slice = createSlice({
  name: 'time',
  initialState: getTime().dayofTime,
  reducers: {
    chooseTime: (state, action: PayloadAction<DayofTime>) => action.payload
  }
})

export default slice.reducer

export const { chooseTime } = slice.actions
