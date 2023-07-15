import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/Redux/store'
import { toastProps } from '@/utils/types'

const initialState: toastProps = {
    message: '',
    status: 'success'
}

const toast = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action : PayloadAction<toastProps>) => {
            state = action.payload
        },
    },
})

export const { setToast } = toast.actions
export const toastState = (state: RootState) => state.toast
export default toast.reducer