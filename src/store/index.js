import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import auth from "./auth";
import room from "./room";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    room,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
