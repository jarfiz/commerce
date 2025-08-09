import { RootState } from "@/lib/store";
import { Cart, Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  products: Product[];
  cart: Cart[];
  status: "pending" | "fulfilled" | "rejected";
  error: boolean | string;
}

const initialState: CartState = {
  products: [],
  cart: [],
  status: "fulfilled",
  error: false,
};

export const fetchProducts = createAsyncThunk("fetch/products", async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      //
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.products.push(...action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? true;
      });
  },
});

export const {} = cartSlice.actions;

// selector
export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
