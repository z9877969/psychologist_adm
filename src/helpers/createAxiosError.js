export const createAxiosError = (error) => {
  const { response } = error;

  return response
    ? {
        ...error,
        message: response.data,
        status: response.status,
      }
    : error;
};
