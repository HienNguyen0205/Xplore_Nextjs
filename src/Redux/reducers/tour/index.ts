import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface tourDataDef {
    destination: string,
    image: string,
    price: number,
    time: number,
    rating: number,
}

const initialState : {value : tourDataDef[]} = {
    value: []
}

const tour = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        setTourData: (state, action) => {
            state.value = action.payload
        },
        resetTourData: state => {
            state.value = []
        }
    },
})

export const { setTourData, resetTourData } = tour.actions
export const tourState = (state: RootState) => state.tour.value
export default tour.reducer