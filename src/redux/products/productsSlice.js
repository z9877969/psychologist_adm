import { createSlice } from '@reduxjs/toolkit';
import {
  addProduct,
  createVariant,
  deleteProduct,
  deleteVariant,
  getOneProduct,
  getProducts,
  updateProduct,
  updateVariant,
} from './productsOperations';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    // variants: [],
    filters: {
      categories: [],
      makers: [],
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        const { filters, products } = payload;
        state.products = products;
        if (filters) {
          state.filters = filters;
        }
      })
      .addCase(getOneProduct.fulfilled, (state, { payload }) => {
        const { product, filters } = payload;
        if (state.products.length) {
          const productIdx = state.products.findIndex(
            (el) => el._id === product._id
          );
          const prod = state.products[productIdx];
          state.products[productIdx] = { ...prod, ...product };
          if (filters) {
            state.filters = filters;
          }
        } else {
          state.products.push(payload);
        }
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.products.push(payload);
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.map((el) =>
          el._id !== payload._id ? el : { ...el, ...payload }
        );
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(({ _id }) => _id !== payload);
      })
      .addCase(createVariant.fulfilled, (state, { payload }) => {
        const { variant, prodId } = payload;
        const product = state.products.find((el) => el._id === prodId);
        product.variants.push(variant);
      })
      .addCase(updateVariant.fulfilled, (state, { payload }) => {
        const { variant, prodId } = payload;
        const product = state.products.find((el) => el._id === prodId);
        const updatedVariantIdx = product.variants.findIndex(
          (el) => el._id === variant._id
        );
        product.variants[updatedVariantIdx] = { ...variant };
      })
      .addCase(deleteVariant.fulfilled, (state, { payload }) => {
        const { _id: varId, product: prodId } = payload;
        const product = state.products.find((el) => el._id === prodId);
        product.variants = product.variants.filter(({ _id }) => _id !== varId);
      }),
});

export default productsSlice.reducer;
