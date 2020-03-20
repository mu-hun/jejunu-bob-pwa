import { createSlice } from '@reduxjs/toolkit'

import { getState } from '../api'
import { State } from '../@types'

const slice = createSlice({
  name: 'state',
  initialState: State.isLoading,
  reducers: {
    setState: () => getState()
  }
})

export default slice.reducer

export const { setState } = slice.actions
