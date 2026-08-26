'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Formik, Form } from 'formik';
import { IoChevronDown } from 'react-icons/io5';
import { fetchFiltersOptions } from '@/lib/firebase/filters';
import type { Teacher } from '@/types/teacher';
import css from './TeachersFiltersNav.module.css';

export interface TeachersFilters {
  language: string;
  level: string;
  price: string;
}

type FieldKey = 'language' | 'level' | 'price';

interface TeachersFiltersNavProps {
  teachers: Teacher[];
  filters: TeachersFilters;
  onFilterChange: (filters: TeachersFilters) => void;
  onApply?: (filters: TeachersFilters) => void;
}

const TeachersFiltersNav = ({
  teachers,
  filters,
  onFilterChange,
  onApply,
}: TeachersFiltersNavProps) => {
  const { data } = useQuery({
    queryKey: ['filters-options'],
    queryFn: fetchFiltersOptions,
  });

  const languages = data?.languages ?? [];
  const levels = data?.levels ?? [];
  const prices = (data?.prices ?? []).map(String);

  const optionsByField: Record<FieldKey, string[]> = {
    language: languages,
    level: levels,
    price: prices.map(String),
  };

  const [pendingFilters, setPendingFilters] = useState(filters);
  const [openField, setOpenField] = useState<FieldKey | null>(null);
  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setPendingFilters(filters);
  }, [filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenField(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getValue(field: FieldKey) {
    return pendingFilters[field] || optionsByField[field][0] || '';
  }

  function updateField(field: FieldKey, value: string) {
    const nextValues = { ...pendingFilters, [field]: value };
    setPendingFilters(nextValues);
    setOpenField(null);
    if (!onApply) {
      onFilterChange(nextValues);
    }
  }

  function handleApplyClick() {
    onFilterChange(pendingFilters);
    onApply?.(pendingFilters);
  }

  const fields: { key: FieldKey; label: string; suffix?: string }[] = [
    { key: 'language', label: 'Languages' },
    { key: 'level', label: 'Level of knowledge' },
    { key: 'price', label: 'Price', suffix: '$' },
  ];

  return (
    <Formik initialValues={filters} enableReinitialize onSubmit={() => {}}>
      {() => (
        <Form className={css.filtersForm} ref={wrapperRef}>
          {fields.map(({ key, label, suffix }) => {
            const isOpen = openField === key;
            const currentValue = getValue(key);

            return (
              <div className={css.field} key={key}>
                <label className={css.label}>{label}</label>
                <div className={css.selectWrapper}>
                  <button
                    type="button"
                    className={`${css.select} ${isOpen ? css.selectOpen : ''}`}
                    onClick={() => setOpenField(isOpen ? null : key)}
                  >
                    {suffix ? `${currentValue} ${suffix}` : currentValue}
                  </button>
                  <IoChevronDown className={`${css.chevron} ${isOpen ? css.chevronOpen : ''}`} />

                  {isOpen && (
                    <ul className={css.dropdown}>
                      {optionsByField[key].map((option) => (
                        <li
                          key={option}
                          className={`${css.option} ${option === currentValue ? css.optionActive : ''}`}
                          onClick={() => updateField(key, option)}
                        >
                          {suffix ? `${option} ${suffix}` : option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}

          {onApply && (
            <button type="button" className={css.applyButton} onClick={handleApplyClick}>
              Apply
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default TeachersFiltersNav;
