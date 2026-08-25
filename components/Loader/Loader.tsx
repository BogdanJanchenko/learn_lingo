'use client';

import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <ClipLoader color="var(--button)" size={48} speedMultiplier={0.8} />
    </div>
  );
};

export default Loader;
