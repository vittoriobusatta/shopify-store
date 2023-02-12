import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity =
          existingItem.quantity >= 20 ? 20 : existingItem.quantity + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart(state) {
      state.items = [];
    },
    updateQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (action.payload.quantity > 0) {
          existingItem.quantity =
            action.payload.quantity <= 20 ? action.payload.quantity : 20;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
