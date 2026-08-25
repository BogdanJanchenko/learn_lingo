import Image from 'next/image';
import css from './NotFound.module.css';
import Container from '@/components/Container/Container';

const NotFound = () => {
  return (
    <Container>
      <main className={css.notFound}>
        <Image
          src="/images/not-found.png"
          alt="404"
          width={512}
          height={512}
          className={css.notFoundImage}
          priority
        />
        <h2 className={css.notFoundTitle}>Page not found</h2>
      </main>
    </Container>
  );
};

export default NotFound;
