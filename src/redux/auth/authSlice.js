import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    toggleAuth(state, { payload = null }) {
      state.token = payload;
    },
    login(state) {
      state.token = 'token';
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { toggleAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;
