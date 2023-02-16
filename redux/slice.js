import { createSlice } from "@reduxjs/toolkit";
import { createCheckout } from "libs/shopify";

// crée un slice de state pour mon panier
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
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
        (total, cartItem) => total + cartItem.variantQuantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
    },
    incrementQuantity: (state, action) => {
      const item = action.payload;

      const itemInCart = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (itemInCart) {
        itemInCart.variantQuantity++;
      }

      state.quantity = state.items.reduce(
        (total, cartItem) => total + cartItem.variantQuantity,
        0
      );
    },
    decrementQuantity: (state, action) => {
      const item = action.payload;

      const itemInCart = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (itemInCart) {
        if (itemInCart.variantQuantity > 1) {
          itemInCart.variantQuantity--;
        }
      }

      state.quantity = state.items.reduce(
        (total, cartItem) => total + cartItem.variantQuantity,
        0
      );
    },
  },
});

// exporte les actions du slice
export const { addToCart, clearCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

// exporte le reducer du slice
export default cartSlice.reducer;
