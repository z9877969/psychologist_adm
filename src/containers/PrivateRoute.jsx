import { selectIsAuth } from '@redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? component : <Navigate to={'/login'} />;
};

export default PrivateRoute;
