import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import messageReducer from "./messageSlice";
const store = configureStore({
  reducer: {
    loaderReducer,
    messageReducer
  },
});
export default store;
