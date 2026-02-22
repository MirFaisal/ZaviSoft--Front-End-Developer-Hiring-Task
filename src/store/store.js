import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import cartReducer, { saveCartToStorage } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Persist cart to localStorage on every change
let prevItems = store.getState().cart.items;
store.subscribe(() => {
  const nextItems = store.getState().cart.items;
  if (nextItems !== prevItems) {
    prevItems = nextItems;
    saveCartToStorage(nextItems);
  }
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

export default store;
