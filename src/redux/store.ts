import { configureStore } from '@reduxjs/toolkit'
import { routeDetail } from './reducers'

const store = configureStore({
  reducer: {
    routeDetail
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch