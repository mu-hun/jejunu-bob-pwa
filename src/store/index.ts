import { combineReducers, configureStore } from '@reduxjs/toolkit'

import data from './data'
import state from './state'
import time from './time'

const reducer = combineReducers({
  data,
  state,
  time
})

export type RootState = ReturnType<typeof reducer>

export default configureStore({ reducer })
