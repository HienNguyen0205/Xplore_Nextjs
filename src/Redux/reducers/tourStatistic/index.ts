import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export interface tourStatisticDef {
    customers: number,
    tourNumber: number,
    successTour: number,
    supportCases: number
}

const initialState: { value : tourStatisticDef } = {
    value: {
        customers: 0,
        tourNumber: 0,
        successTour: 0,
        supportCases: 0
    }
}

const tourStatistic = createSlice({
    name: 'tourStatistic',
    initialState,
    reducers: {
        setTourStatistic: (state, action) => {
            state.value = action.payload
        },
        removeTourStatistic: state => {
            state.value = {
                customers: 0,
                tourNumber: 0,
                successTour: 0,
                supportCases: 0
            }
        }
    },
})

export const tourStatisticState = (state: RootState) => state.tourStatistic.value
export default tourStatistic.reducer