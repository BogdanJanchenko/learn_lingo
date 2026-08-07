'use client';

import Image from 'next/image';
import { Formik, Form, Field } from 'formik';
import css from './FiltersPanel.module.css';

export interface CamperFilters {
  location: string;
  form: string;
  engine: string;
  transmission: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
}

type FiltersPanelProps = {
  initialFilters: CamperFilters;
  onSearch: (filters: CamperFilters) => void;
  onClear: () => void;
};

const FiltersPanel = ({ initialFilters, onSearch, onClear }: FiltersPanelProps) => {
  return (
    <Formik
      initialValues={initialFilters}
      enableReinitialize
      onSubmit={(values) => {
        onSearch(values);
      }}
    >
      {({ resetForm }) => (
        <Form className={css.filtersPanel}>
          {/* Location */}
          <div className={css.filtersLocation}>
            <p className={css.filtersLabel}>Location</p>
            <div className={css.filtersLocationInput}>
              <Image
                src="/icons/light-map-icon.svg"
                alt="location-icon"
                width={20}
                height={20}
                className={css.icon}
              />
              <Field name="location" type="text" placeholder="Country, City" />
            </div>
          </div>

          <div className={css.filtersGroups}>
            <p className={css.filtersTextStyle}>Filters</p>

            {/* Camper form */}
            <div className={css.filtersGroup}>
              <p className={css.filtersLabel}>Camper form</p>
              <label>
                <Field type="radio" name="form" value="alcove" />
                Alcove
              </label>
              <label>
                <Field type="radio" name="form" value="panel_van" />
                Panel Van
              </label>
              <label>
                <Field type="radio" name="form" value="integrated" />
                Integrated
              </label>
              <label>
                <Field type="radio" name="form" value="semi_integrated" />
                Semi Integrated
              </label>
            </div>

            {/* Engine */}
            <div className={css.filtersGroup}>
              <p className={css.filtersLabel}>Engine</p>
              <label>
                <Field type="radio" name="engine" value="diesel" />
                Diesel
              </label>
              <label>
                <Field type="radio" name="engine" value="petrol" />
                Petrol
              </label>
              <label>
                <Field type="radio" name="engine" value="hybrid" />
                Hybrid
              </label>
              <label>
                <Field type="radio" name="engine" value="electric" />
                Electric
              </label>
            </div>

            {/* Transmission */}
            <div className={css.filtersGroup}>
              <p className={css.filtersLabel}>Transmission</p>
              <label>
                <Field type="radio" name="transmission" value="automatic" />
                Automatic
              </label>
              <label>
                <Field type="radio" name="transmission" value="manual" />
                Manual
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={css.filtersActions}>
            <button className={css.filtersSearchButton} type="submit">
              Search
            </button>
            <button
              className={css.filtersClearButton}
              type="button"
              onClick={() => {
                resetForm();
                onClear();
              }}
            >
              <Image
                src="/icons/close-icon.svg"
                alt="close-icon"
                width={11}
                height={11}
                className={css.icon}
              />
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FiltersPanel;
