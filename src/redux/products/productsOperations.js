import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProductApi,
  createVariantApi,
  deleteProductApi,
  deleteVariantApi,
  getFiltersApi,
  getOneProductApi,
  getProductsApi,
  updateProductApi,
  updateVariantApi,
} from 'services/productsApi';

export const getProducts = createAsyncThunk(
  'get/products',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters: f } = getState().products;
      const products = await getProductsApi();
      const filters = await getFiltersApi(f);

      return { products, filters };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  'get/one-product',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { filters: f } = getState().products;
      const product = await getOneProductApi(id);
      const filters = await getFiltersApi(f);

      return { product, filters };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'add/product',
  async (product, { rejectWithValue }) => {
    try {
      const newProduct = await addProductApi(product);

      return newProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'update/product',
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const updatedProduct = await updateProductApi({ id, product });

      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'delete/product',
  async (id, { rejectWithValue }) => {
    try {
      const { _id } = await deleteProductApi(id);

      return _id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVariant = createAsyncThunk(
  'create/variant',
  async ({ variant, prodId }, { rejectWithValue }) => {
    try {
      const newVariant = await createVariantApi({ variant, prodId });

      return { prodId, variant: newVariant };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVariant = createAsyncThunk(
  'update/variant',
  async ({ variant, varId }, { rejectWithValue }) => {
    try {
      const newVariant = await updateVariantApi({ variant, varId });

      return { prodId: newVariant.product, variant: newVariant };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVariant = createAsyncThunk(
  'delete/variant',
  async (varId, { rejectWithValue }) => {
    try {
      const variant = await deleteVariantApi(varId);

      return variant;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
