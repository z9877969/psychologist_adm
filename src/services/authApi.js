import { baseInstance as instance } from './baseApi';

const token = {
  set(token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    instance.defaults.headers.common.Authorization = '';
  },
};

export const loginUserApi = async ({ email, password }) => {
  const { data } = await instance.post('/auth/login', { email, password });
  token.set(data.token);
  return { token: data.token };
};

export const logoutUserApi = async () => {
  await instance.post('/auth/logout');
  token.unset();
};

export const getCurUserApi = async (storedToken) => {
  token.set(storedToken);
  await instance.get('/auth/current');
};
