import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading: (_, { payload }) => {
      return payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        ({ type }) => type.endsWith('rejected') || type.endsWith('fulfilled'),
        () => {
          return false;
        }
      )
      .addMatcher(
        ({ type }) => type.endsWith('pending'),
        () => {
          return true;
        }
      ),
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
