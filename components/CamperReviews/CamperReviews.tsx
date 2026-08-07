'use client';

import Image from 'next/image';
import css from './CamperReviews.module.css';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface CamperReviewsProps {
  reviews: Review[];
}

const CamperReviews = ({ reviews }: CamperReviewsProps) => {
  return (
    <section className={css.reviewsSection}>
      <div className={css.reviewsList}>
        {reviews?.map((review, i) => (
          <article className={css.reviewCard} key={`${review.reviewer_name}-${i}`}>
            <div className={css.reviewHeader}>
              <div className={css.reviewAvatar}>{review.reviewer_name.charAt(0).toUpperCase()}</div>

              <div className={css.reviewUserInfo}>
                <p className={css.reviewName}>{review.reviewer_name}</p>

                <div className={css.reviewRating}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      src={
                        index < review.reviewer_rating
                          ? '/icons/yellow-star-icon.svg'
                          : '/icons/gray-star-icon.svg'
                      }
                      alt="Star"
                      width={16}
                      height={16}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className={css.reviewComment}>{review.comment}</p>
          </article>
        ))}
        {(!reviews || reviews.length === 0) && <p>No reviews yet for this camper.</p>}
      </div>
    </section>
  );
};

export default CamperReviews;
