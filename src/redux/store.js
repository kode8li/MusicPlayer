// store.js
import { configureStore } from "@reduxjs/toolkit";
// import musicReducer from "./musicReducer";
import musicSlice from "./musicSlice";

const store = configureStore({
  reducer: {
    music: musicSlice,
  }
})

export default store;
