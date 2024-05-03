import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    message: null,
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        ({ type }) => type.endsWith('rejected'),
        (state, { payload }) => {
          state.message = payload;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('fulfilled'),
        (state) => {
          state.message = null;
        }
      ),
});

export default errorSlice.reducer;
