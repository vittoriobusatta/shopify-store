import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delFromCart } from "libs/shopify/admin";
import { addToCart, createCart } from "libs/shopify/storefront";

export const CREATE_CART = createAsyncThunk(
  "cart/CREATE_CART",
  async (item, { rejectWithValue }) => {
    try {
      const cartCreated = await createCart(item.id, item.variantQuantity);
      return { item, cartCreated };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const ADD_TO_CART = createAsyncThunk(
  "cart/ADD_TO_CART",
  async (item, { rejectWithValue }) => {
    try {
      const cartUpdated = await addToCart(
        item.cartId,
        item.id,
        item.variantQuantity
      );
      return { item, cartUpdated };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const DEL_FROM_CART = createAsyncThunk(
  "cart/DEL_FROM_CART",
  async (item, { rejectWithValue }) => {
    try {
      const cartDeleted = await delFromCart(
        item.cartId,
        item.id,
      )
      return { item, cartDeleted };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    chargeAmount: 0,
    id: null,
  },
  reducers: {
    CLEAR_CART: (state) => {
      state.items = [];
      state.quantity = 0;
      state.chargeAmount = 0;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CREATE_CART.fulfilled, (state, action) => {
      const { item, cartCreated } = action.payload;

      state.items = cartCreated.lines.edges.map((line) => {
        const items = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          item: items,
        };
      });

      state.id = cartCreated.id;
      state.quantity = cartCreated.totalQuantity;
      state.chargeAmount = cartCreated.cost.checkoutChargeAmount.amount;
      console.log("CREATE", cartCreated);
    });
    builder.addCase(CREATE_CART.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
      const { item, cartUpdated } = action.payload;

      state.items = cartUpdated.lines.edges.map((line) => {
        const items = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          item: items,
        };
      });

      state.quantity = cartUpdated.totalQuantity;
      state.chargeAmount = cartUpdated.cost.checkoutChargeAmount.amount;
      console.log("UPDATE", cartUpdated);
    });
    builder.addCase(ADD_TO_CART.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(DEL_FROM_CART.fulfilled, (state, action) => {
      const { item, cartDeleted } = action.payload;

      state.items = cartDeleted.lines.edges.map((line) => {
        const items = {
          handle: item.handle,
          id: item.id,
          title: item.title,
          variantQuantity: item.variantQuantity,
        };
        return {
          line: line,
          item: items,
        };
      });

      state.quantity = cartDeleted.totalQuantity;
      state.chargeAmount = cartDeleted.cost.checkoutChargeAmount.amount;
      console.log("DELETE", cartDeleted);
    }
    );
  },
});

export const { CLEAR_CART } = cartSlice.actions;

export default cartSlice.reducer;
