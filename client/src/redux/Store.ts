import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // chat:chatReducer
  }
})

// console.log(store.getState().auth,'store')

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;