import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    message: null,
    status: null,
  },
  reducers: {
    setError: (state, { payload }) => {
      const { status = null, message = null } = payload;
      state.status = status;
      state.message = message;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        ({ type }) => type.endsWith('rejected'),
        (state, { payload }) => {
          const { status = null, message = null } = payload;
          state.status = status;
          state.message = message;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith('fulfilled'),
        (state) => {
          state.message = null;
          state.status = null;
        }
      ),
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
