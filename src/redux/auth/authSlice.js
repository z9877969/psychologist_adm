import { createSlice } from '@reduxjs/toolkit';
import { getCurUser, loginUser, logoutUser } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isRefresh: false,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.isRefresh = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(getCurUser.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(getCurUser.fulfilled, (state) => {
        state.isRefresh = false;
      })
      .addCase(getCurUser.rejected, (state) => {
        state.isRefresh = false;
      }),
});

export const { toggleAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;
