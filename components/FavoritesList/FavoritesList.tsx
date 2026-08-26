'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Container from '../Container/Container';
import Loader from '@/components/Loader/Loader';
import NoCards from '@/components/NoCards/NoCards';
import Modal from '@/components/Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';

import { removeFavorite, fetchUserFavorites } from '@/lib/firebase/favorites';
import { fetchTeachersByIds } from '@/lib/firebase/teachers';
import { useAuthStore } from '@/lib/stores/authStore';

import type { Teacher } from '@/types/teacher';
import css from './FavoritesList.module.css';

const FavoritesList = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [bookingTeacher, setBookingTeacher] = useState<Teacher | null>(null);
  const currentUser = useAuthStore((state) => state.currentUser);
  const queryClient = useQueryClient();

  const { data: favoriteIdsArray = [] } = useQuery({
    queryKey: ['favorites', currentUser?.uid],
    queryFn: () => fetchUserFavorites(currentUser!.uid),
    enabled: Boolean(currentUser),
  });

  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ['favoriteTeachers', favoriteIdsArray],
    queryFn: () => fetchTeachersByIds(favoriteIdsArray),
    enabled: favoriteIdsArray.length > 0,
  });

  const { mutate: removeFavoriteMutation, isPending } = useMutation({
    mutationFn: ({ uid, teacherId }: { uid: string; teacherId: string }) =>
      removeFavorite(uid, teacherId),
    onSuccess: (_, { uid }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', uid] });
      toast.success('Teacher removed from favorites');
    },
    onError: () => {
      toast.error('Could not update favorites');
    },
  });

  function handleRemoveFavorite(teacherId: string) {
    if (!currentUser) return;
    removeFavoriteMutation({ uid: currentUser.uid, teacherId });
  }

  function toggleExpanded(teacherId: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(teacherId)) {
        next.delete(teacherId);
      } else {
        next.add(teacherId);
      }
      return next;
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (favoriteIdsArray.length === 0 || teachers.length === 0) {
    return <NoCards />;
  }

  return (
    <Container>
      <ul className={css.teachersList}>
        {teachers.map((teacher) => {
          const isExpanded = expandedIds.has(teacher.id);

          return (
            <li key={teacher.id} className={css.teacherCard}>
              <div className={css.avatarWrapper}>
                <Image
                  className={css.avatar}
                  src={teacher.avatar_url}
                  alt={`${teacher.name} ${teacher.surname}`}
                  width={96}
                  height={96}
                />
                <span className={css.onlineDot} />
              </div>

              <div className={css.content}>
                <div className={css.topRow}>
                  <div>
                    <p className={css.label}>Languages</p>
                    <h3 className={css.name}>
                      {teacher.name} {teacher.surname}
                    </h3>
                  </div>

                  <div className={css.statsDesktop}>
                    <span>Lessons done: {teacher.lessons_done}</span>
                    <span className={css.divider} />
                    <span>Rating: {teacher.rating}</span>
                    <span className={css.divider} />
                    <span>
                      Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`${css.favoriteButton} ${css.favorite}`}
                    aria-label="Remove from favorites"
                    aria-pressed="true"
                    disabled={isPending}
                    onClick={() => handleRemoveFavorite(teacher.id)}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5767 4.99419C22.0233 4.44061 21.3664 4.00147 20.6433 3.70187C19.9202 3.40226 19.1452 3.24805 18.3625 3.24805C17.5798 3.24805 16.8048 3.40226 16.0817 3.70187C15.3586 4.00147 14.7017 4.44061 14.1483 4.99419L13 6.14252L11.8517 4.99419C10.734 3.87652 9.21812 3.24863 7.6375 3.24863C6.05688 3.24863 4.541 3.87652 3.42333 4.99419C2.30567 6.11186 1.67777 7.62774 1.67777 9.20836C1.67777 10.789 2.30567 12.3049 3.42333 13.4225L4.57167 14.5709L13 22.9992L21.4283 14.5709L22.5767 13.4225C23.1302 12.8692 23.5694 12.2122 23.869 11.4892C24.1686 10.7661 24.3228 9.99105 24.3228 9.20836C24.3228 8.42566 24.1686 7.65064 23.869 6.92756C23.5694 6.20448 23.1302 5.54751 22.5767 4.99419Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <p className={css.speaks}>
                  <span className={css.speaksLabel}>Speaks: </span>
                  <span className={css.speaksLanguages}>{teacher.languages.join(', ')}</span>
                </p>

                <p className={css.infoRow}>
                  <span className={css.infoLabel}>Lesson Info: </span>
                  {teacher.lesson_info}
                </p>

                <p className={css.infoRow}>
                  <span className={css.infoLabel}>Conditions: </span>
                  {teacher.conditions.join(' ')}
                </p>

                <button
                  type="button"
                  className={css.readMore}
                  onClick={() => toggleExpanded(teacher.id)}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>

                <div className={`${css.aboutReviews} ${isExpanded ? css.visible : ''}`}>
                  <p className={css.experienceText}>{teacher.experience}</p>
                  <ul className={css.reviewsList}>
                    {teacher.reviews.map((review, index) => (
                      <li key={index} className={css.reviewItem}>
                        <div className={css.reviewHeader}>
                          <span className={css.reviewerName}>{review.reviewer_name}</span>
                          <span className={css.reviewerRating}>★ {review.reviewer_rating}</span>
                        </div>
                        <p className={css.reviewComment}>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className={css.levelsList}>
                  {teacher.levels.map((level, index) => (
                    <li key={level} className={index === 0 ? css.levelBadgeActive : css.levelBadge}>
                      #{level}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`${css.bookButton} ${isExpanded ? css.visible : ''}`}
                  onClick={() => setBookingTeacher(teacher)}
                >
                  Book trial lesson
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Modal isOpen={bookingTeacher !== null} onClose={() => setBookingTeacher(null)}>
        {bookingTeacher && (
          <BookingForm teacher={bookingTeacher} onSuccess={() => setBookingTeacher(null)} />
        )}
      </Modal>
    </Container>
  );
};

export default FavoritesList;
