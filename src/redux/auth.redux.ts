import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: {
    isLoading: false,
    isfetching: false,
    userDetails: null,
    error: null,
  },
};

export const authRedux = createSlice({
  name: "authRedux",
  initialState: initialAuthState,
  reducers: {
    loginUser: (state) => {
      state.user.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.user.isLoading = false;
      state.user.isfetching = false;
      state.user.userDetails = action?.payload;
    },
    loginFailure: (state, action) => {
      state.user.isLoading = false;
      state.user.error = action?.payload?.data;
    },

    fetchUserData: (state) => {
      state.user.isfetching = true;
    },
    signOutUser: (state) => {
      state.user.isLoading = true;
    },
    signOutUserSuccess: (state) => {
      state.user.isLoading = false;
      state.user.userDetails = null;
    },

    resetAuthState: () => initialAuthState,
  },
});

export const {
  loginUser,
  loginSuccess,
  loginFailure,
  fetchUserData,
  resetAuthState,
  signOutUser,
  signOutUserSuccess,
} = authRedux.actions;

export default authRedux.reducer;
