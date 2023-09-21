import { createSlice } from "@reduxjs/toolkit";

const userDetails = {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    personalDetails: (state, action) => {
      state.user = action.payload;
      userDetails.personalDetails = state.user.formData;
    },
    contact: (state, action) => {
      state.user = action.payload;
      userDetails.contact = state.user.formData;
    },
    accountInfo: (state, action) => {
      state.user = action.payload;
      userDetails.accountInfo = state.user.formData;
    },
    address: (state, action) => {
      state.user = action.payload;
      userDetails.address = state.user.formData;
    },
    final: (state, action) => {
      state.user = action.payload;
      userDetails.terms = state.user.formData;
      console.log(userDetails);
    },
  },
});

export const { personalDetails, contact, accountInfo, address, final } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
