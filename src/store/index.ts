import { combineReducers, configureStore } from '@reduxjs/toolkit'

import data from './data'
import state from './state'

const reducer = combineReducers({
  data,
  state
})

export type RootState = ReturnType<typeof reducer>

export default configureStore({ reducer })
