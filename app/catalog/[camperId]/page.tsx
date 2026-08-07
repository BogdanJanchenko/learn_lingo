'use client'; // Обязательно для Next.js App Router при использовании хуков

import { use, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { notFound } from 'next/navigation'; // Импортируем функцию для редиректа на 404
import toast from 'react-hot-toast';

import CamperGallery from '@/components/CamperGallery/CamperGallery';
import Loader from '@/components/Loader/Loader';
import CamperInfo from '@/components/CamperInfo/CamperInfo';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import BookingForm from '@/components/BookingForm/BookingForm';

import {
  fetchSingleCamper,
  fetchCamperReviews,
  createBookingRequest,
} from '../../../lib/campersApi';
import type { CamperImage } from '../../../types/campers';

import css from './page.module.css';

type Props = {
  params: Promise<{ camperId: string }>;
};

interface BookingPayload {
  name: string;
  email: string;
}

const CamperDetailPage = ({ params }: Props) => {
  const { camperId } = use(params);

  const {
    data: camper,
    isLoading: isCamperLoading,
    isError: isCamperError,
  } = useQuery({
    queryKey: ['camper', camperId],
    queryFn: () => fetchSingleCamper(camperId),
    enabled: !!camperId,
  });

  // 2. Запрос на отзывы к этому кемперу
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ['camper-reviews', camperId],
    queryFn: () => fetchCamperReviews(camperId),
    enabled: !!camperId,
  });

  const bookingMutation = useMutation({
    mutationFn: (payload: BookingPayload) => createBookingRequest(camperId, payload),
    onSuccess: () => {
      toast.success('Booking request sent successfully!');
    },
    onError: () => {
      toast.error('Failed to send booking request. Please try again.');
    },
  });

  useEffect(() => {
    if (isCamperError) {
      notFound();
    }
  }, [isCamperError]);

  const isLoading = isCamperLoading || isReviewsLoading;

  if (isLoading) return <Loader />;

  if (!camper) {
    notFound();
  }

  return (
    <main className={css.detailsPageContainer}>
      <div className={css.topInfoBlock}>
        <CamperGallery name={camper.name} gallery={camper.gallery as CamperImage[]} />
        <CamperInfo
          name={camper.name}
          price={camper.price}
          rating={camper.rating}
          reviewsCount={camper.totalReviews}
          location={camper.location}
          description={camper.description}
          transmission={camper.transmission}
          engine={camper.engine}
          form={camper.form}
          amenities={camper.amenities as unknown as string[]}
          length={camper.length}
          width={camper.width}
          height={camper.height}
          tank={camper.tank}
          consumption={camper.consumption}
        />
      </div>

      <h2 className={css.reviewsTitle}>Reviews</h2>

      <div className={css.bottomInfoBlock}>
        <CamperReviews reviews={reviews || []} />
        <BookingForm
          onSubmitBooking={bookingMutation.mutateAsync}
          isSubmitting={bookingMutation.isPending}
        />
      </div>
    </main>
  );
};

export default CamperDetailPage;
