'use client'; // Обязательно для Next.js App Router

import Link from 'next/link';
import Image from 'next/image';
import css from './CamperCard.module.css';

type CamperCardProps = {
  id: string;
  name: string;
  price: number;
  location: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  description: string;
  transmission: string;
  engine: string;
  form: string;
  amenities: string[];
};

const CamperCard = ({
  id,
  name,
  price,
  location,
  imageUrl,
  rating,
  reviewsCount,
  description,
  transmission,
  engine,
  form,
  amenities,
}: CamperCardProps) => {
  return (
    <article className={css.camperCard}>
      <div className={css.imageWrapper}>
        <Image
          className={css.camperCardImage}
          src={imageUrl || '/images/placeholder.jpg'}
          alt={name}
          fill
          sizes="219px"
          priority={false}
        />
      </div>

      <div className={css.camperCardContent}>
        <div className={css.camperCardHeader}>
          <p className={css.camperName}>{name}</p>
          <p className={css.camperCardPrice}>€{price.toFixed(2)}</p>
        </div>

        <div className={css.camperCardMeta}>
          <div className={css.camperCardRating}>
            <Image src="/icons/yellow-star-icon.svg" alt="Star Icon" width={16} height={16} />
            <p>
              {rating} ({reviewsCount} Reviews)
            </p>
          </div>

          <div className={css.camperCardLocation}>
            <Image src="/icons/light-map-icon.svg" alt="Map Icon" width={16} height={16} />
            <p>{location}</p>
          </div>
        </div>

        <p className={css.camperCardDescription}>
          {description || 'No description provided for this camper model.'}
        </p>

        <div className={css.camperCardBadges}>
          <span className={css.badge}>
            <Image src="/icons/petrol-icon.svg" alt="" width={20} height={20} /> {engine}
          </span>
          <span className={css.badge}>
            <Image src="/icons/automatic-icon.svg" alt="" width={20} height={20} /> {transmission}
          </span>
          <span className={css.badge}>
            <Image src="/icons/camper-icon.svg" alt="" width={20} height={20} /> {form}
          </span>

          {amenities?.map((amenity) => (
            <span key={amenity} className={css.badge}>
              {amenity.toUpperCase()}
            </span>
          ))}
        </div>

        <Link
          className={css.camperCardLink}
          href={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show More
        </Link>
      </div>
    </article>
  );
};

export default CamperCard;
