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

    // deleteTodo: (state, action: PayloadAction<string>) => {
    //   state.todos = state.todos.filter((item) => item._id !== action.payload);
    //   state.filteredTodos = state.todos;
    // },
  },
});

export const { addBookingProduct } =
  bookingProductSlice.actions;

export default bookingProductSlice.reducer;
