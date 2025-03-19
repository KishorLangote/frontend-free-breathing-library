import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,  // Default: user is logged out
  role: "user",       // Default role
};

const authSlice = createSlice({
  name: "auth",
  initialState, // <-- Add initialState here
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      state.role = action.payload;  // Update role from action payload
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
