import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./reducer/contactSlice";
import userSlice from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    contacts: contactSlice,
    user: userSlice,
  },
});
