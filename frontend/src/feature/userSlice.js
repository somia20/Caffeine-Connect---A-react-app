import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    signUpUser: (state, action) => {
      state.user = action.payload; 
    },
    SignIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signUpUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;