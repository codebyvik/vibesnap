import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: {
    isLoading: false,
    isfetching: false,
    userDetails: null,
    error: null,
    success: false,
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
      state.user.success = false;
    },
    loginFailure: (state, action) => {
      state.user.isLoading = false;
      state.user.error = action?.payload?.data;
    },

    fetchUserData: (state) => {
      state.user.isfetching = true;
      state.user.success = false;
    },
    signOutUser: (state) => {
      state.user.isLoading = true;
    },
    signOutUserSuccess: (state) => {
      state.user.isLoading = false;
      state.user.userDetails = null;
    },

    updateProfile: (state, _action) => {
      state.user.isLoading = true;
      state.user.success = false;
    },
    updateProfileSuccess: (state) => {
      state.user.isLoading = false;
      state.user.success = true;
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
  updateProfile,
  updateProfileSuccess,
} = authRedux.actions;

export default authRedux.reducer;
