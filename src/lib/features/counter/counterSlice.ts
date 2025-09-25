import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

const initialState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    inc: (state) => {
      state.counter += 1;
    },
    dec: (state) => {
      state.counter -= 1;
    },
    incByVal: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    decByVal: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
    reset: (state) => {
      state.counter = 0;
    },
  },
});

export const { inc, dec, incByVal, decByVal, reset } = counterSlice.actions;

// selector
export const selectCounter = (state: RootState) => state.counter.counter;

export default counterSlice.reducer;
