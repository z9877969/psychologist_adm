import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import {
  BlogsListPage,
  FeedbacksListPage,
  MainPage,
  OneBlogPage,
  LoginPage,
} from './pages';
import { SharedLayout } from 'shared/components';
import { Toastify } from 'shared/components';
import { PrivateRoute, PublicRoute } from 'containers';
import { useError } from 'hooks/useError';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurUser } from '@redux/auth/authOperations';
import { selectIsRefresh } from '@redux/auth/authSelectors';

function App() {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefresh);

  useError();

  useEffect(() => {
    dispatch(getCurUser());
  }, [dispatch]);

  return (
    <>
      <Toastify />
      {!isRefresh && (
        <Routes>
          <Route path={ROUTES.HOME} element={<SharedLayout />}>
            <Route index element={<PrivateRoute component={<MainPage />} />} />
            <Route
              path="feedbacks"
              element={<PrivateRoute component={<FeedbacksListPage />} />}
            />
            <Route
              path="blogs"
              element={<PrivateRoute component={<BlogsListPage />} />}
            />
            <Route
              path="blogs/:blogId"
              element={<PrivateRoute component={<OneBlogPage />} />}
            />
            <Route
              path="login"
              element={<PublicRoute component={<LoginPage />} />}
            />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
