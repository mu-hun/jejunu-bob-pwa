import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { DayofMenu } from '../@types'

const slice = createSlice({
  name: 'data',
  // @ts-ignore
  initialState: {} as DayofMenu,
  reducers: {
    setData: (state, action: PayloadAction<DayofMenu>) => action.payload
  }
})

export default slice.reducer

export const { setData } = slice.actions
