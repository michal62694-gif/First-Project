import { configureStore } from '@reduxjs/toolkit'
import apiReducer from '../features/apikeys/ApiSlice'

export const store = configureStore({
  reducer: {
        api: apiReducer,

  },
})