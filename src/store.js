import { configureStore } from "@reduxjs/toolkit";
import { apiSliceServer } from "./feature/apiSliceServer";

export const store = configureStore({
  reducer: {
    [apiSliceServer.reducerPath]: apiSliceServer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSliceServer.middleware),
});
