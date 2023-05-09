import { configureStore } from "@reduxjs/toolkit"
import { tour, tourStatistic } from '../reducers'

export const store = configureStore({
    reducer: {
        tour,
        tourStatistic,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch