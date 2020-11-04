import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getTime, getStatus } from '../api'
import { DayOfTime, Status, Weekly, WeeklyKeys } from '../@types'
import fetchThunk from './thunk'

import dummyData from './dummyData.json'

interface State {
  time: DayOfTime
  selectedDay: WeeklyKeys
  status: Status
  data: Weekly
  error: string
}

const initialState: State = {
  time: getTime().dayOfTime,
  selectedDay: ((new Date().getDay() - 1) % 5) as WeeklyKeys,
  status: getStatus(),
  data: dummyData,
  error: ''
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    chooseTime: (state, action: PayloadAction<DayOfTime>) => ({
      ...state,
      time: action.payload
    })
  },
  extraReducers: builder => {
    builder.addCase(fetchThunk.fulfilled, (state, action) => ({
      ...state,
      data: action.payload,
      status: Status.Loaded
    }))
    builder.addCase(fetchThunk.rejected, (state, action) => ({
      ...state,
      status: Status.Error,
      error: action.error.message ?? 'rejected'
    }))
  }
})

export default slice.reducer

export const { chooseTime } = slice.actions
