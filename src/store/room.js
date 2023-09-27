import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    id: null,
    adminId: null,
    name: null,
    description: null,
    createdAt: null,
    updatedAt: null,
    picture: null,
    isJoined: null,
  },
  reducers: {
    setActualRoom: (state, action) => {
      if (!action.payload) return;
      state.id = action.payload.id;
      state.adminId = action.payload.adminId;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.picture = action.payload.picture;
      state.isJoined = action.payload.isJoined;
    },
    removeActualRoom: (state) => {
      state.id = null;
      state.adminId = null;
      state.name = null;
      state.description = null;
      state.createdAt = null;
      state.updatedAt = null;
      state.picture = null;
      state.isJoined = null;
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
