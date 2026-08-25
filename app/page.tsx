'use client';

import Hero from '@/components/Hero/Hero';
import css from './page.module.css';

import { useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import StatsBlock from '@/components/StatsBlock/StatsBlock';

const Home = () => {
  useEffect(() => {
    console.log('Firebase auth object:', auth);
  }, []);

  return (
    <main className={css.homeMain}>
      <Hero />
      <StatsBlock />
    </main>
  );
};

export default Home;
