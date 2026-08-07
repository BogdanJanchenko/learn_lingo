'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './CamperGallery.module.css';

interface GalleryImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

interface CamperGalleryProps {
  name: string;
  gallery: GalleryImage[];
}

const CamperGallery = ({ name, gallery }: CamperGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!gallery || gallery.length === 0) return null;

  const currentMainImage = gallery[activeIndex] || gallery[0];

  return (
    <div className={css.galleryContainer}>
      <div className={css.mainImageWrapper}>
        <Image
          className={css.detailsMainImage}
          src={currentMainImage.original}
          alt={`${name} - view ${activeIndex + 1}`}
          priority
          width={638}
          height={505}
        />
      </div>

      <ul className={css.thumbsList}>
        {gallery.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={image.id}
              className={`${css.thumbWrapper} ${isActive ? css.activeThumb : ''}`}
              onClick={() => setActiveIndex(index)} // Переключаем фото по клику
            >
              <Image
                className={css.thumbImage}
                src={image.thumb}
                alt={`${name} preview ${index + 1}`}
                fill
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CamperGallery;
