'use client';

import css from './page.module.css';

import FavoritesList from '@/components/FavoritesList/FavoritesList';

export default function FavoritesPage() {
  return (
    <main className={css.main}>
      <FavoritesList />
    </main>
  );
}
