import { createSlice } from '@reduxjs/toolkit'
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
        setToast: (state, action) => {
            state = action.payload
        },
        removeToast: state => {
            state.message = ''
        }
    },
})

export const { setToast, removeToast } = toast.actions
export const toastState = (state: RootState) => state.toast
export default toast.reducer