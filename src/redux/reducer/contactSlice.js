// contactSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    list: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.list.push(action.payload);
    },
    setContacts: (state, action) => {
      state.list = action.payload;
    },
    updateContact: (state, action) => {
      // state.list.push(action.payload);
      const updatedContact = action.payload;
      // Find the index of the contact to update
      const contactIndex = state.list.findIndex(
        (contact) => contact.CId === updatedContact.CId
      );
      console.log("ine: ", contactIndex)
      if (contactIndex !== -1) {
       
        state.list[contactIndex] = updatedContact;
      }
      console.log(state.list)
    },
    removeContact: (state, action) => {
      state.list = state.list.filter(
        (contact) => contact.CId !== action.payload
      );
      console.log(state.list);
    },
  },
});

export const { addContact, removeContact, setContacts, updateContact } =
  contactSlice.actions;
export default contactSlice.reducer;
