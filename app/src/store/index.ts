import { configureStore } from '@reduxjs/toolkit'
import { bookingsApi } from './api/bookingsApi'

export const store = configureStore({
  reducer: {
    [bookingsApi.reducerPath]: bookingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookingsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

