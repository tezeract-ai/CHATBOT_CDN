import { createSlice } from "@reduxjs/toolkit";

// Initial State

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    resetAuth: () => initialState,

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // EVENTS
    getSigninSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
  },
});

// Reducer
export default authSlice.reducer;

// Action creators are generated for each case reducer function
export const { startLoading, hasError, getSigninSuccess, resetAuth } =
  authSlice.actions;
