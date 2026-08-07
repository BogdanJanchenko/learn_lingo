'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import css from './BookingForm.module.css';
import { CreateBookingResponse, CreateBookingPayload } from '@/types/campers';

interface BookingFormProps {
  onSubmitBooking: (values: CreateBookingPayload) => Promise<CreateBookingResponse>;
  isSubmitting: boolean;
}

const bookingValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Please enter your full name.'),
  email: Yup.string().email('Please enter a valid email address.').required('Comment is required'),
});

const BookingForm = ({ onSubmitBooking, isSubmitting }: BookingFormProps) => {
  const initialValues: CreateBookingPayload = {
    name: '',
    email: '',
  };

  const handleSubmit = async (
    values: CreateBookingPayload,
    { resetForm }: { resetForm: () => void }
  ) => {
    await onSubmitBooking({
      name: values.name,
      email: values.email,
    });
    resetForm();
  };

  return (
    <section className={css.bookingCard}>
      <div className={css.headerBlock}>
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={bookingValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.formGrid}>
            <div className={css.inputsGroup}>
              <div className={css.inputWrapper}>
                {errors.name && touched.name && <span className={css.errorLabel}>Name*</span>}
                <Field
                  type="text"
                  name="name"
                  placeholder={errors.name && touched.name ? '' : 'Name*'}
                  className={errors.name && touched.name ? css.errorInput : ''}
                />
                {errors.name && touched.name && (
                  <div className={css.errorIconWrapper}>
                    <Image src="/icons/error-icon.svg" alt="Error" width={24} height={24} />
                  </div>
                )}
                <ErrorMessage name="name" component="span" className={css.errorText} />
              </div>

              <div className={css.inputWrapper}>
                {errors.email && touched.email && <span className={css.errorLabel}>Email*</span>}
                <Field
                  type="text"
                  name="email"
                  placeholder={errors.email && touched.email ? '' : 'Email*'}
                  className={errors.email && touched.email ? css.errorInput : ''}
                />
                {errors.email && touched.email && (
                  <div className={css.errorIconWrapper}>
                    <Image src="/icons/error-icon.svg" alt="Error" width={24} height={24} />
                  </div>
                )}
                <ErrorMessage name="email" component="span" className={css.errorText} />
              </div>
            </div>

            <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BookingForm;
