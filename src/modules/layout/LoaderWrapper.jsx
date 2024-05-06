import { useSelector } from 'react-redux';
import { Loader } from 'shared/components';

const LoaderWrapper = () => {
  const isLoading = useSelector((state) => state.loading);
  return isLoading && <Loader />;
};

export default LoaderWrapper;
