'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Container from '../Container/Container';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';

import { addFavorite, removeFavorite, fetchUserFavorites } from '@/lib/firebase/favorites';
import { useAuthStore } from '@/lib/stores/authStore';

import type { Teacher } from '@/types/teacher';
import css from './TeachersList.module.css';

interface TeachersListProps {
  teachers: Teacher[];
}

const TeachersList = ({ teachers }: TeachersListProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [bookingTeacher, setBookingTeacher] = useState<Teacher | null>(null);
  const currentUser = useAuthStore((state) => state.currentUser);
  const queryClient = useQueryClient();

  const { data: favoriteIdsArray = [] } = useQuery({
    queryKey: ['favorites', currentUser?.uid],
    queryFn: () => fetchUserFavorites(currentUser!.uid),
    enabled: Boolean(currentUser),
  });

  const favoriteIds = new Set(favoriteIdsArray);

  const { mutate: toggleFavoriteMutation, isPending } = useMutation({
    mutationFn: ({
      uid,
      teacherId,
      isFavorite,
    }: {
      uid: string;
      teacherId: string;
      isFavorite: boolean;
    }) => (isFavorite ? removeFavorite(uid, teacherId) : addFavorite(uid, teacherId)),
    onSuccess: (_, { teacherId, isFavorite, uid }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', uid] });
      toast.success(isFavorite ? 'Teacher removed from favorites' : 'Teacher added to favorites');
    },
    onError: () => {
      toast.error('Could not update favorites');
    },
  });

  function handleToggleFavorite(teacherId: string) {
    if (!currentUser) {
      toast.error('Please log in to add teachers to favorites');
      return;
    }

    toggleFavoriteMutation({
      uid: currentUser.uid,
      teacherId,
      isFavorite: favoriteIds.has(teacherId),
    });
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

  return (
    <Container>
      <ul className={css.teachersList}>
        {teachers.map((teacher) => {
          const isExpanded = expandedIds.has(teacher.id);
          const isFavorite = favoriteIds.has(teacher.id);

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
                    <div className={css.colorStats}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6667 4.13333C14.6667 3.3866 14.6667 3.01323 14.5213 2.72801C14.3935 2.47713 14.1895 2.27316 13.9387 2.14532C13.6534 2 13.2801 2 12.5333 2H12.2667C10.7732 2 10.0265 2 9.45603 2.29065C8.95426 2.54631 8.54631 2.95426 8.29065 3.45603C8 4.02646 8 4.77319 8 6.26667V14L8.0667 13.8999C8.5298 13.2053 8.76135 12.858 9.06727 12.6065C9.33809 12.3839 9.65016 12.2169 9.9856 12.1151C10.3645 12 10.7819 12 11.6168 12H12.5333C13.2801 12 13.6534 12 13.9387 11.8547C14.1895 11.7268 14.3935 11.5229 14.5213 11.272C14.6667 10.9868 14.6667 10.6134 14.6667 9.86667V4.13333Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.33331 4.13333C1.33331 3.3866 1.33331 3.01323 1.47864 2.72801C1.60647 2.47713 1.81044 2.27316 2.06133 2.14532C2.34654 2 2.71991 2 3.46665 2H3.73331C5.22679 2 5.97352 2 6.54395 2.29065C7.04572 2.54631 7.45367 2.95426 7.70933 3.45603C7.99998 4.02646 7.99998 4.77319 7.99998 6.26667V14L7.93328 13.8999C7.47018 13.2053 7.23863 12.858 6.93271 12.6065C6.66188 12.3839 6.34982 12.2169 6.01438 12.1151C5.63548 12 5.21805 12 4.3832 12H3.46665C2.71991 12 2.34654 12 2.06133 11.8547C1.81044 11.7268 1.60647 11.5229 1.47864 11.272C1.33331 10.9868 1.33331 10.6134 1.33331 9.86667V4.13333Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Lessons online
                    </div>
                    <span className={css.divider} />
                    <span>Lessons done: {teacher.lessons_done}</span>
                    <span className={css.divider} />
                    <div className={css.colorStats}>
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.88971 4.12573C9.04886 4.42725 9.33893 4.63786 9.67487 4.69604L13.4747 5.35229L10.7872 8.11987C10.5497 8.36444 10.4388 8.70526 10.4874 9.04272L11.0362 12.8601L7.57526 11.1589L7.45807 11.1091C7.21999 11.0245 6.95982 11.0245 6.72174 11.1091L6.60455 11.1589L3.14264 12.8601L3.69244 9.04272C3.74097 8.70526 3.63016 8.36444 3.39264 8.11987L0.704163 5.35229L4.50494 4.69604C4.84088 4.63786 5.13095 4.42725 5.2901 4.12573L7.0899 0.7146L8.88971 4.12573Z"
                          fill="var(--laptop)"
                          stroke="var(--laptop)"
                          strokeWidth="1.2"
                        />
                      </svg>
                      Rating: {teacher.rating}
                    </div>
                    <span className={css.divider} />
                    <span>
                      Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`${css.favoriteButton} ${isFavorite ? css.favorite : ''}`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={isFavorite}
                    disabled={isPending}
                    onClick={() => handleToggleFavorite(teacher.id)}
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

                <div className={css.statsMobile}>
                  <div className={css.colorStats}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6667 4.13333C14.6667 3.3866 14.6667 3.01323 14.5213 2.72801C14.3935 2.47713 14.1895 2.27316 13.9387 2.14532C13.6534 2 13.2801 2 12.5333 2H12.2667C10.7732 2 10.0265 2 9.45603 2.29065C8.95426 2.54631 8.54631 2.95426 8.29065 3.45603C8 4.02646 8 4.77319 8 6.26667V14L8.0667 13.8999C8.5298 13.2053 8.76135 12.858 9.06727 12.6065C9.33809 12.3839 9.65016 12.2169 9.9856 12.1151C10.3645 12 10.7819 12 11.6168 12H12.5333C13.2801 12 13.6534 12 13.9387 11.8547C14.1895 11.7268 14.3935 11.5229 14.5213 11.272C14.6667 10.9868 14.6667 10.6134 14.6667 9.86667V4.13333Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.33331 4.13333C1.33331 3.3866 1.33331 3.01323 1.47864 2.72801C1.60647 2.47713 1.81044 2.27316 2.06133 2.14532C2.34654 2 2.71991 2 3.46665 2H3.73331C5.22679 2 5.97352 2 6.54395 2.29065C7.04572 2.54631 7.45367 2.95426 7.70933 3.45603C7.99998 4.02646 7.99998 4.77319 7.99998 6.26667V14L7.93328 13.8999C7.47018 13.2053 7.23863 12.858 6.93271 12.6065C6.66188 12.3839 6.34982 12.2169 6.01438 12.1151C5.63548 12 5.21805 12 4.3832 12H3.46665C2.71991 12 2.34654 12 2.06133 11.8547C1.81044 11.7268 1.60647 11.5229 1.47864 11.272C1.33331 10.9868 1.33331 10.6134 1.33331 9.86667V4.13333Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Lessons online
                  </div>
                  <span className={css.divider} />
                  <span>Lessons done: {teacher.lessons_done}</span>
                  <span className={css.divider} />
                  <div className={css.colorStats}>
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.88971 4.12573C9.04886 4.42725 9.33893 4.63786 9.67487 4.69604L13.4747 5.35229L10.7872 8.11987C10.5497 8.36444 10.4388 8.70526 10.4874 9.04272L11.0362 12.8601L7.57526 11.1589L7.45807 11.1091C7.21999 11.0245 6.95982 11.0245 6.72174 11.1091L6.60455 11.1589L3.14264 12.8601L3.69244 9.04272C3.74097 8.70526 3.63016 8.36444 3.39264 8.11987L0.704163 5.35229L4.50494 4.69604C4.84088 4.63786 5.13095 4.42725 5.2901 4.12573L7.0899 0.7146L8.88971 4.12573Z"
                        fill="var(--laptop)"
                        stroke="var(--laptop)"
                        strokeWidth="1.2"
                      />
                    </svg>
                    Rating: {teacher.rating}
                  </div>
                  <span className={css.divider} />
                  <span>
                    Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span>
                  </span>
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

      {isPending && <Loader />}

      <Modal isOpen={bookingTeacher !== null} onClose={() => setBookingTeacher(null)}>
        {bookingTeacher && (
          <BookingForm teacher={bookingTeacher} onSuccess={() => setBookingTeacher(null)} />
        )}
      </Modal>
    </Container>
  );
};

export default TeachersList;
