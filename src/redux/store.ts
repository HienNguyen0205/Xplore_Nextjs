import { configureStore } from '@reduxjs/toolkit'
import { routeDetail, apiSlice } from './reducers'

const store = configureStore({
  reducer: {
    routeDetail,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch