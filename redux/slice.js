import { createSlice } from "@reduxjs/toolkit";
import { createCheckout } from "libs/shopify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    checkout: null,
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;

      const itemInCart = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (itemInCart) {
        itemInCart.variantQuantity++;
      } else {
        state.items.push({
          ...item,
          variantQuantity: 1,
        });
      }

      state.quantity = state.items.reduce(
        (total, item) => total + item.variantQuantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.variantPrice * item.variantQuantity,
        0
      );
    },
    DEL_FROM_CART: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((cartItem) => cartItem.id !== item.id);

      state.quantity = state.items.reduce(
        (total, item) => total + item.variantQuantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.variantPrice * item.variantQuantity,
        0
      );
    },
    UPDATE_QUANTITY: (state, action) => {
      const item = action.payload;
      console.log(item);
    },
    CLEAR_CART: (state, action) => {
      state.items = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.checkout = null;
    },
  },
});

export const {
  ADD_TO_CART,
  DEL_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  UPDATE_CHECKOUT,
} = cartSlice.actions;

export default cartSlice.reducer;
