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
        itemInCart.quantity++;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
      state.quantity = state.items.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );

    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === itemId);
      item.quantity++;
      state.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === itemId);
      item.quantity--;
      state.quantity--;
      if (item.quantity === 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== itemId);
      }
    },
  },
});

// exporte les actions du slice
export const { addToCart, clearCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

// exporte le reducer du slice
export default cartSlice.reducer;
