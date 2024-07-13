import { createSlice } from "@reduxjs/toolkit/react";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types";



export type TInitialState = {
  products: TProduct[];
  cartEmpty: boolean;

};
const initialState: TInitialState = {
  products: [],
  cartEmpty: true,
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
        existingProduct.price +=
          action.payload.price * (action.payload.quantity || 1);
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.cartEmpty = false;
    },

    deleteBookingProduct: (state, action: PayloadAction<string>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload
      );

      if (existingProduct) {
        if (
          existingProduct.quantity !== undefined &&
          existingProduct.quantity > 1
        ) {
          existingProduct.quantity -= 1;
          existingProduct.price -=
            existingProduct.price / (existingProduct.quantity + 1);
        } else {
          state.products = state.products.filter(
            (item) => item._id !== action.payload
          );
        }
      }
      if (state.products.length === 0) {
        state.cartEmpty = true;
      }
    },

    deletePaymentBookingProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );

      if (state.products.length === 0) {
        state.cartEmpty = true;
      }
    },
  },
});

export const { addBookingProduct, deleteBookingProduct, deletePaymentBookingProduct } =
  bookingProductSlice.actions;

export default bookingProductSlice.reducer;
