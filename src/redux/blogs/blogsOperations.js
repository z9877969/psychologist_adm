import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAxiosError } from 'helpers';
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
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
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
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
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
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
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
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
    }
  }
);
