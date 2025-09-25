import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/lib/features/cart/cartSlice";
import counterSlice from "@/lib/features/counter/counterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice,
      cart: cartSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
