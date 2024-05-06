import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAxiosError } from 'helpers';
import { getCurUserApi, loginUserApi, logoutUserApi } from 'services/authApi';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const { token } = await loginUserApi(body);
      return { token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi();
    } catch (error) {
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
    }
  }
);

export const getCurUser = createAsyncThunk(
  'auth/get-current',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      await getCurUserApi(token);
    } catch (error) {
      const { message, status } = createAxiosError(error);
      return rejectWithValue({ message, status });
    }
  },
  {
    condition(_, { getState }) {
      const { token } = getState().auth;
      return Boolean(token);
    },
  }
);
