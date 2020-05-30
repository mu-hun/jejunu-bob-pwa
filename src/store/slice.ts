import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getTime, getStatus } from '../api'
import { DayofTime, Status, DayofMenu } from '../@types'
import fetchThunk from './thunk'

interface State {
  time: DayofTime
  status: Status
  data: DayofMenu
  error: string
}

const dummyData = {
  점심: { 정식: ['없음'], 특식: ['없음'], 양식: ['없음'], 중식: ['없음'] },
  저녁: { 정식: ['없음'], 특식: ['없음'], 양식: ['없음'], 중식: ['없음'] }
}

const initialState: State = {
  time: getTime().dayofTime,
  status: getStatus(),
  data: dummyData,
  error: ''
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    chooseTime: (state, action: PayloadAction<DayofTime>) => ({
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
