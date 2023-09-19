import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { tourDetailStore } from "@/utils/types";

interface routeDetailState {
  value: tourDetailStore
}

const initialState : routeDetailState = {
  value: {
    _id: "",
    departure: '',
    route: '',
    destination: '',
    date: {
      from: "",
      to: "",
    },
    price: 0,
    rating: 0,
    quantity: 1,
  },
};

export const routeDetail = createSlice({
  name: "routeDetail",
  initialState,
  reducers: {
    setRouteSelected: (state, action: PayloadAction<tourDetailStore>) => {
      state.value = {...state.value, ...action.payload}
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      const quantity = action.payload
      if(quantity > 20){
        state.value.quantity = 20
      }else if(quantity < 1){
        state.value.quantity = 1
      }else{
        state.value.quantity = action.payload
      }
    },
    resetData: state => {
      state.value = initialState.value
    }
  },
});

export const { setRouteSelected, setQuantity, resetData } = routeDetail.actions;
export const selectCount = (state: RootState) => state.routeDetail;
export default routeDetail.reducer;
