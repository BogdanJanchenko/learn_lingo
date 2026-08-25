'use client';

import { useState } from 'react';
import css from './TeachersFilters.module.css';

import Container from '../Container/Container';
import Modal from '../Modal/Modal';
import TeachersFiltersNav, {
  type TeachersFilters as TeachersFiltersValues,
} from '../TeachersFiltersNav/TeachersFiltersNav';
import type { Teacher } from '@/types/teacher';

interface TeachersFiltersProps {
  teachers: Teacher[];
  filters: TeachersFiltersValues;
  onFilterChange: (filters: TeachersFiltersValues) => void;
}

const TeachersFilters = ({ teachers, filters, onFilterChange }: TeachersFiltersProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleReset() {
    onFilterChange({ language: '', level: '', price: '' });
  }

  return (
    <>
      <Container>
        <div className={css.desktopFiltersNav}>
          <TeachersFiltersNav
            teachers={teachers}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>

        <ul className={css.mobileFiltersBlock}>
          <li>
            <button
              type="button"
              className={css.mobileFiltersButton}
              onClick={() => setIsMenuOpen(true)}
            >
              Filters
            </button>
          </li>
          <li>
            <button type="button" className={css.mobileFiltersReset} onClick={handleReset}>
              Reset
            </button>
          </li>
        </ul>
      </Container>

      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <TeachersFiltersNav
          teachers={teachers}
          filters={filters}
          onFilterChange={onFilterChange}
          onApply={() => setIsMenuOpen(false)}
        />
      </Modal>
    </>
  );
};

export default TeachersFilters;
