'use client';

import Image from 'next/image';
import css from './CamperInfo.module.css';

interface CamperInfoProps {
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  location: string;
  description: string;
  transmission: string;
  engine: string;
  form: string;
  amenities: string[];
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}

const CamperInfo = ({
  name,
  price,
  rating,
  reviewsCount,
  location,
  description,
  transmission,
  engine,
  form,
  amenities,
  length,
  width,
  height,
  tank,
  consumption,
}: CamperInfoProps) => {
  return (
    <aside className={css.sidebarContainer}>
      <div className={`${css.cardBlock} ${css.summaryBlock}`}>
        <h1 className={css.camperName}>{name}</h1>

        <div className={css.metaRow}>
          <span className={css.ratingInfo}>
            <Image src="/icons/yellow-star-icon.svg" alt="Star" width={16} height={16} />
            {rating} ({reviewsCount} Reviews)
          </span>

          <span className={css.locationInfo}>
            <Image src="/icons/light-map-icon.svg" alt="Map" width={16} height={16} />
            {location}
          </span>
        </div>

        <p className={css.price}>€{price.toFixed(2)}</p>
        <p className={css.description}>{description}</p>
      </div>

      <div className={`${css.cardBlock} ${css.vehicleBlock}`}>
        <h2>Vehicle details</h2>

        <div className={css.badgesGrid}>
          <span className={css.badge}>
            <Image src="/icons/automatic-icon.svg" alt="" width={20} height={20} /> {transmission}
          </span>
          <span className={css.badge}>
            <Image src="/icons/petrol-icon.svg" alt="" width={20} height={20} /> {engine}
          </span>
          <span className={css.badge}>
            <Image src="/icons/camper-icon.svg" alt="" width={20} height={20} />{' '}
            {form.replace('_', ' ')}
          </span>

          {amenities?.map((amenity) => (
            <span key={amenity} className={css.badge}>
              {amenity.toUpperCase()}
            </span>
          ))}
        </div>

        <ul className={css.detailsList}>
          <li>
            <span>Form</span>
            <span>{form.replace('_', ' ')}</span>
          </li>
          <li>
            <span>Length</span>
            <span>{length}</span>
          </li>
          <li>
            <span>Width</span>
            <span>{width}</span>
          </li>
          <li>
            <span>Height</span>
            <span>{height}</span>
          </li>
          <li>
            <span>Tank</span>
            <span>{tank}</span>
          </li>
          <li>
            <span>Consumption</span>
            <span>{consumption}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CamperInfo;
