import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../api'

export default createAsyncThunk('fetchThunk', (_, thunkApi) => fetchData())
