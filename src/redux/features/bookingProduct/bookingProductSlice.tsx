import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types";



type TInitialState = {
  products: TProduct[];

};
const initialState: TInitialState = {
  products: [],
};

const bookingProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addBookingProduct: (state, action: PayloadAction<TProduct>) => {
      state.products.push(action.payload);
    },

    deleteBookingProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    
    },
  },
});

export const { addBookingProduct, deleteBookingProduct } = bookingProductSlice.actions;

export default bookingProductSlice.reducer;
