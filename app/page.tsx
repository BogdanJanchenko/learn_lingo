'use client';

import Hero from '@/components/Hero/Hero';
import css from './page.module.css'; // Добавили импорт стилей страницы

const Home = () => {
  return (
    <main className={css.homeMain}>
      <Hero />
    </main>
  );
};

export default Home;
