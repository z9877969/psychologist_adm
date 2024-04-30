import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import {
  AboutBrushBuddyPage,
  BlogsListPage,
  MainPage,
  OneBlogPage,
  OneProductPage,
  ProductsListPage, // MainPage,
} from './pages';
import { SharedLayout } from 'shared/components';
import { Toastify } from 'shared/components';
import { PrivateRoute, PublicRoute } from 'containers';
import LoginPage from 'pages/LoginPage';

function App() {
  return (
    <>
      <Toastify />
      <Routes>
        <Route path={ROUTES.HOME} element={<SharedLayout />}>
          <Route index element={<PrivateRoute component={<MainPage />} />} />
          <Route
            path="products"
            element={<PrivateRoute component={<ProductsListPage />} />}
          />
          <Route
            path="products/:prodId/*"
            element={<PrivateRoute component={<OneProductPage />} />}
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
            path="about"
            element={<PrivateRoute component={<AboutBrushBuddyPage />} />}
          />
          <Route
            path="login"
            element={<PublicRoute component={<LoginPage />} />}
          />
        </Route>
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </>
  );
}

export default App;
