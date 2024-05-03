import { logout } from '@redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useError = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error.message);

  if (errorMsg?.includes('401')) {
    dispatch(logout());
  }

  return null;
};
