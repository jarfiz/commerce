import { RootState } from "@/lib/store";
import { Cart, Product } from "@/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
  products: Product[];
  cart: Cart[];
  status: "pending" | "fulfilled" | "rejected";
  error: boolean | string;
  total: number;
}

const initialState: CartState = {
  products: [],
  cart: [],
  status: "fulfilled",
  error: false,
  total: 0,
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
    addToCart: (state, action) => {
      const exits = state.cart.find((item) => item.id === action.payload.id);
      state.total = state.cart.reduce((acc, val) => acc + val.quantity, 1);

      if (exits) {
        exits.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
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

export const { addToCart } = cartSlice.actions;

// selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectTotalQuantity = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
