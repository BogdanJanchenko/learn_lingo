'use client'; // Обязательно для Next.js App Router

import css from './EmptyCatalogState.module.css';
import Image from 'next/image';

type EmptyCatalogStateProps = {
  onBackToFullCatalog: () => void;
};

const EmptyCatalogState = ({ onBackToFullCatalog }: EmptyCatalogStateProps) => {
  return (
    <div className={css.emptyCatalogState}>
      <Image src="/images/trailer-not-found.png" alt="Trailer not found" width={488} height={463} />
      <h2>No campers found</h2>
      <p>Try changing your filters or go back to the full catalog.</p>
      <button className={css.backButton} type="button" onClick={onBackToFullCatalog}>
        Back to full catalog
      </button>
    </div>
  );
};

export default EmptyCatalogState;
