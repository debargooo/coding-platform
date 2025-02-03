import { configureStore } from "@reduxjs/toolkit";
import codingReducer from "./slices/codingSlice";

export const store = configureStore({
  reducer: {
    easyQs: codingReducer,
  },
});
