import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '..';
import Layout from 'modules/layout/Layout';

const SharedLayout = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </>
  );
};

export default SharedLayout;
