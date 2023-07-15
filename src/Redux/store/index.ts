import { configureStore } from "@reduxjs/toolkit"
import { toast } from '../reducers'

export const store = configureStore({
    reducer: {
        toast,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch