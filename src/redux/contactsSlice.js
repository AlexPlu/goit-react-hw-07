import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";
import axios from "axios";

axios.defaults.baseURL = "https://6664514d932baf9032aab27e.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async (contact, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", contact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action, append = false) => {
  state.loading = false;
  if (append) {
    state.items.push(action.payload);
  } else {
    state.items = action.payload;
  }
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => handlePending(state))
      .addCase(fetchContacts.fulfilled, (state, action) => handleFulfilled(state, action))
      .addCase(fetchContacts.rejected, (state, action) => handleRejected(state, action))
      .addCase(addContact.pending, (state) => handlePending(state))
      .addCase(addContact.fulfilled, (state, action) => handleFulfilled(state, action, true))
      .addCase(addContact.rejected, (state, action) => handleRejected(state, action))
      .addCase(deleteContact.pending, (state) => handlePending(state))
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => handleRejected(state, action));
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter], (contacts, name) =>
  contacts.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()))
);

export default contactsSlice.reducer;
