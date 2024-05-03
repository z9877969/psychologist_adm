import { baseInstance as instance } from './baseApi';

export const getFeedbacksListApi = async () => {
  const { data } = await instance.get('/feedbacks');
  return data;
};

export const updateFeedbackStatusApi = async ({ id, showStatus }) => {
  const { data } = await instance.patch(`/feedbacks/${id}`, {
    show: showStatus,
  });
  return data;
};

export const deleteFeedbackApi = async (id) => {
  const { data } = await instance.delete(`/feedbacks/${id}`);
  return data;
};
