import { configureStore } from "@reduxjs/toolkit"
import { tour, toast } from '../reducers'

export const store = configureStore({
    reducer: {
        tour,
        toast,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch