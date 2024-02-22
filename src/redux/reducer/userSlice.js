// contactSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    accessToken: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    removeUser: (state, action) => {
      state.user = {};
      state.accessToken = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
