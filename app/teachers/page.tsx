'use client';

import { useEffect, useState } from 'react';
import css from './page.module.css';

import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';
import { fetchTeachers } from '@/lib/firebase/teachers';

import TeachersList from '@/components/TeachersList/TeachersList';
import Loader from '@/components/Loader/Loader';
import NoCards from '@/components/NoCards/NoCards';
import TeachersFilters from '@/components/TeachersFilters/TeachersFilters';
import type { TeachersFilters as TeachersFiltersValues } from '@/components/TeachersFiltersNav/TeachersFiltersNav';
import Container from '@/components/Container/Container';

const PER_PAGE = 4;

const initialFilters: TeachersFiltersValues = {
  language: '',
  level: '',
  price: '',
};

export default function TeachersPage() {
  const [filters, setFilters] = useState<TeachersFiltersValues>(initialFilters);
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['teachers', visibleCount, filters],
    queryFn: () =>
      fetchTeachers(visibleCount, {
        language: filters.language || undefined,
        level: filters.level || undefined,
        price: filters.price ? Number(filters.price) : undefined,
      }),
  });

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isError]);

  function handleFilterChange(nextFilters: TeachersFiltersValues) {
    setFilters(nextFilters);
    setVisibleCount(PER_PAGE);
  }

  function handleLoadMore() {
    setVisibleCount((count) => count + PER_PAGE);
  }

  const hasMore = Boolean(data && data.length === visibleCount);

  return (
    <main className={css.main}>
      <TeachersFilters
        teachers={data ?? []}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      {data && data.length > 0 && <TeachersList teachers={data} />}
      {data && data.length === 0 && <NoCards />}
      {isLoading && <Loader />}

      {hasMore && !isLoading && (
        <Container>
          <button
            type="button"
            className={css.loadMoreButton}
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        </Container>
      )}
    </main>
  );
}
