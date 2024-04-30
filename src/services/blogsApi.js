import { bbInstance as instance } from './bbApi';

export const getBlogsListApi = async () => {
  const { data } = await instance.get('/blogs');
  return data;
};

export const getOneBlogApi = async (id) => {
  const { data } = await instance.get(`/blogs/${id}`);
  return data;
};

export const addBlogApi = async (blog) => {
  const { data } = await instance.post(`/blogs`, { items: blog });
  return data;
};

export const updateBlogApi = async ({ id, blog }) => {
  const { data } = await instance.patch(`/blogs/${id}`, { items: blog });
  return data;
};

export const deleteBlogApi = async (id) => {
  const { data } = await instance.delete(`/blogs/${id}`);
  return data;
};
