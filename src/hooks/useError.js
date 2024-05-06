import { logout } from '@redux/auth/authSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useError = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error && [401, 500].includes(error.status)) {
      dispatch(logout());
    }
  }, [error, dispatch]);

  return null;
};
