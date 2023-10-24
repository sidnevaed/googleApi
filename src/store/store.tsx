import { configureStore } from "@reduxjs/toolkit";
import booksSliceReducer from "./booksSlice";

export const store = configureStore({
  reducer: {
    volumeList: booksSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
