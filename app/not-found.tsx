import Image from 'next/image';
import css from './NotFound.module.css';

const NotFound = () => {
  return (
    <main className={css.notFoundContainer}>
      <Image
        src="/images/trailer-not-found.png"
        alt="Trailer not found"
        width={586}
        height={556}
        className={css.notFoundImage}
        priority
      />
      <h1 className={css.notFoundTitle}>404</h1>
      <p className={css.notFoundText}>Page not found</p>
    </main>
  );
};

export default NotFound;
