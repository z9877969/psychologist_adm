import { selectIsAuth } from '@redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);
  return !isAuth ? component : <Navigate to={'/main'} />;
};

export default PublicRoute;
