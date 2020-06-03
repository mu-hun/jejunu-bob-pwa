import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData } from '../api'

export default createAsyncThunk(
  'fetchThunk',
  async () => (await fetchData()).data
)
