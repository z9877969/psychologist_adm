import { createSlice } from '@reduxjs/toolkit';
import {
  addBlog,
  deleteBlog,
  getBlogsList,
  getOneBlog,
  updateBlog,
} from './blogsOperations';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  extraReducers: (builder) =>
    builder
      .addCase(getBlogsList.fulfilled, (_, { payload }) => {
        return payload;
      })
      .addCase(getOneBlog.fulfilled, (state, { payload }) => {
        return [...state, payload];
      })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        return [...state, payload];
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        return state.map((el) =>
          el._id !== payload._id ? el : { ...el, ...payload }
        );
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        return state.filter((el) => el._id !== payload._id);
      }),
});

export default blogsSlice.reducer;
