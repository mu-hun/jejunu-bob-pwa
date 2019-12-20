import { createAction, createReducer } from '@reduxjs/toolkit'

import { getState } from '../api'
import { State } from '../@types'

export const setState = createAction<undefined, 'state'>('state')

export default createReducer(State.isLoading, {
  [setState.type]: _ => getState()
})
