'use client';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <div className={css.loaderCard}>
        <div className={css.spinner} />

        <h3 className={css.title}>Loading trucks...</h3>
        <p className={css.subtitle}>Please wait while we fetch the best travel trucks for you</p>
      </div>
    </div>
  );
};

export default Loader;
