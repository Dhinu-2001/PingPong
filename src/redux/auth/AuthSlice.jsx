import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { userLoginAction } from "../actions/userAction";

const initialState = {
  accessToken: null,
  refreshToken: null,
  id: null,
  username: null,
  email: null,
  profile_picture: null,
  isAuthenticated: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewToken: (state, action) => {
      state.accessToken = action.payload.newAccessToken;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.id = null;
      state.username = null;
      state.email = null;
      state.profile_picture = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, () => {
        return initialState;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.accessToken = action.payload.userData.accessToken;
          state.refreshToken = action.payload.userData.refreshToken;
          state.id = action.payload.userData.id;
          state.username = action.payload.userData.username;
          state.email = action.payload.userData.email;
          state.profile_picture = action.payload.userData.profile_picture;
          state.isAuthenticated = true;
          state.error = false
        }
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      });
  },
});

export const { setAuthData, clearAuthData, setError, setLoading, setNewToken } =
  authSlice.actions;
export default authSlice.reducer;
