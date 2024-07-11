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
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

       if (existingProduct) {
        if (existingProduct.quantity) {
          existingProduct.quantity += action.payload.quantity || 1;
        } else {
          existingProduct.quantity = action.payload.quantity || 1;
        }
        existingProduct.price += action.payload.price * (action.payload.quantity || 1);
      } else {
        state.products.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
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
