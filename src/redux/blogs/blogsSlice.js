import { createSlice } from '@reduxjs/toolkit';
import {
  addBlog,
  deleteBlog,
  getBlogsList,
  // getOneBlog,
  updateBlog,
} from './blogsOperations';
import { logout } from '@redux/auth/authSlice';
import { logoutUser } from '@redux/auth/authOperations';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    categories: [],
    blogs: [],
  },
  extraReducers: (builder) =>
    builder
      .addCase(getBlogsList.fulfilled, (_, { payload }) => {
        return payload;
      })
      // .addCase(getOneBlog.fulfilled, (state, { payload }) => {
      //   return [...state, payload];
      // })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        state.blogs.push(payload);
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        state.blogs = state.blogs.map((el) =>
          el._id !== payload._id ? el : { ...el, ...payload }
        );
      })
      .addCase(deleteBlog.fulfilled, (state, { payload }) => {
        state.blogs = state.blogs.filter((el) => el._id !== payload._id);
      })
      .addCase(logout, () => {
        return {
          categories: [],
          blogs: [],
        };
      })
      .addCase(logoutUser.fulfilled, () => {
        return {
          categories: [],
          blogs: [],
        };
      }),
});

export default blogsSlice.reducer;
