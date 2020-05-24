import { createSlice } from '@reduxjs/toolkit'

import { getStatus } from '../api'
import { Status } from '../@types'

const slice = createSlice({
  name: 'state',
  initialState: Status.isLoading,
  reducers: {
    setStatus: () => getStatus()
  }
})

export default slice.reducer

export const { setStatus: setState } = slice.actions
