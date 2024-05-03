import { baseInstance as instanse } from './baseApi';

export const getPagesApi = async (pageName) => {
  const { data } = await instanse.get(`/pages/${pageName}`);
  return data;
};

export const updatePageApi = async (id, body) => {
  const { data } = await instanse.patch(`/pages/${id}`, body);
  return data;
};
