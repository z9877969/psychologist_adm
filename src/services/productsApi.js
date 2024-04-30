import { bbInstance as instance } from './bbApi';

export const getProductsApi = async () => {
  const { data } = await instance.get('/products');

  return data;
};

export const getOneProductApi = async (id) => {
  const { data } = await instance.get('/products/' + id);
  return data;
};

export const addProductApi = async (product) => {
  const { data } = await instance.post('/products', product);
  return data;
};

export const updateProductApi = async ({ id, product }) => {
  const { data } = await instance.patch('/products/' + id, product);
  return data;
};

export const deleteProductApi = async (id) => {
  const { data } = await instance.delete('/products/' + id);
  return data;
};

export const getFiltersApi = async (filters) => {
  if (Object.values(filters).every((el) => el.length === 0)) {
    const { data } = await instance.get('/filters');
    return data;
  }
  return null;
};

export const createVariantApi = async ({ variant, prodId }) => {
  const { data } = await instance.post('/variants/' + prodId, variant);

  return data;
};

export const updateVariantApi = async ({ varId, variant }) => {
  const { data } = await instance.patch('/variants/' + varId, variant);

  return data;
};

export const deleteVariantApi = async (varId) => {
  const { data } = await instance.delete('/variants/' + varId);

  return data;
};
