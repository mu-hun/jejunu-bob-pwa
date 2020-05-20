import { combineReducers, configureStore } from '@reduxjs/toolkit'

import reducer from './slice'

export type RootState = ReturnType<typeof reducer>

export default configureStore({ reducer })
