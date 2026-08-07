'use client'; // Обязательно для Next.js App Router

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import FiltersPanel from '@/components/FiltersPanel/FiltersPanel';
import CamperCard from '@/components/CamperCard/CamperCard';
import EmptyCatalogState from '@/components/EmptyCatalogState/EmptyCatalogState';
import Loader from '@/components/Loader/Loader';

import { fetchCampers } from '../../lib/campersApi';

import type { FetchCampersParams } from '../../types/campers';
import type { CamperFilters } from '@/components/FiltersPanel/FiltersPanel';

import { VehicleForm, TransmissionType, EngineType } from '@/types/filters';

import toast from 'react-hot-toast';

import css from './page.module.css';

const initialFilters: CamperFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
  AC: false,
  bathroom: false,
  kitchen: false,
  TV: false,
  radio: false,
  refrigerator: false,
  microwave: false,
  gas: false,
  water: false,
};

const CatalogPage = () => {
  const [activeFilters, setActiveFilters] = useState<CamperFilters>(initialFilters);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['campers', activeFilters],

      queryFn: ({ pageParam = 1 }) => {
        const params: FetchCampersParams = {
          page: pageParam,
          perPage: 4,
          location: activeFilters.location || undefined,
          form: activeFilters.form ? (activeFilters.form as VehicleForm) : undefined,
          transmission: activeFilters.transmission
            ? (activeFilters.transmission as TransmissionType)
            : undefined,
          engine: activeFilters.engine ? (activeFilters.engine as EngineType) : undefined,
        };

        return fetchCampers(params);
      },

      initialPageParam: 1,

      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const handleSearch = (newFilters: CamperFilters) => {
    setActiveFilters(newFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters(initialFilters);
  };

  const totalCampersLoaded = data?.pages.reduce((acc, page) => acc + page.campers.length, 0) || 0;
  const isCatalogEmpty = !isLoading && totalCampersLoaded === 0;

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again.');
    }
  }, [isError]);

  return (
    <>
      <section className={css.catalogLayout}>
        <FiltersPanel
          initialFilters={activeFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />

        <div className={css.catalogContent}>
          {isCatalogEmpty && <EmptyCatalogState onBackToFullCatalog={handleClearFilters} />}

          {!isLoading && !isError && (
            <div className="campers-list">
              {data?.pages.map((page) =>
                page.campers.map((camper) => (
                  <CamperCard
                    key={camper.id}
                    id={camper.id}
                    name={camper.name}
                    price={camper.price}
                    location={camper.location}
                    imageUrl={camper.coverImage}
                    rating={camper.rating}
                    reviewsCount={camper.totalReviews}
                    description={camper.description}
                    transmission={camper.transmission}
                    engine={camper.engine}
                    form={camper.form}
                    amenities={camper.amenities}
                  />
                ))
              )}
            </div>
          )}

          {hasNextPage && (
            <button
              className={css.loadMoreButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              Load More
            </button>
          )}

          {isLoading && <Loader />}
        </div>
      </section>
    </>
  );
};

export default CatalogPage;
