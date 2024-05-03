import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addBlogApi,
  deleteBlogApi,
  getBlogsListApi,
  updateBlogApi,
} from 'services/blogsApi';

export const getBlogsList = createAsyncThunk(
  'get/blogs-list',
  async (_, { rejectWithValue }) => {
    try {
      const blogs = await getBlogsListApi();
      return blogs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition(_, { getState }) {
      return getState().blogs.blogs.length < 2;
    },
  }
);

export const addBlog = createAsyncThunk(
  'add/blog',
  async (blogData, { rejectWithValue }) => {
    try {
      const blog = await addBlogApi(blogData);
      return blog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'update/blog',
  async ({ blog, blogId }, { rejectWithValue }) => {
    try {
      const blogData = await updateBlogApi({ blog, id: blogId });
      return blogData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'delete/blog',
  async (blogId, { rejectWithValue }) => {
    try {
      const blog = await deleteBlogApi(blogId);
      return blog;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
