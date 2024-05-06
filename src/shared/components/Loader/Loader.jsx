import s from './Loader.module.scss';
import { createPortal } from 'react-dom';

const loaderRoot = document.querySelector('#loader-root');

const Loader = () => {
  return createPortal(
    <div className={s.wrapper}>
      <h1>Завантажуємо...</h1>
    </div>,
    loaderRoot
  );
};

export default Loader;
