import { createSlice } from "@reduxjs/toolkit";

const initialState = sessionStorage.getItem("auth")
  ? JSON.parse(sessionStorage.getItem("auth"))
  : {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.picture = action.payload.picture;
      state.createdAt = action.payload.createdAt;
      state.accessToken = action.payload.accessToken;
      sessionStorage.setItem("auth", JSON.stringify(state));
    },
    removeAuth(state) {
      state.id = null;
      state.username = null;
      state.picture = null;
      state.createdAt = null;
      state.accessToken = null;
      sessionStorage.removeItem("auth");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
