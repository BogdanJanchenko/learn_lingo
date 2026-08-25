// components/BookingForm/BookingForm.tsx
'use client';

import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import Image from 'next/image';
import type { Teacher } from '@/types/teacher';
import css from './BookingForm.module.css';

interface BookingFormProps {
  teacher: Teacher;
  onSuccess: () => void;
}

interface BookingFormValues {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}

const bookingSchema = yup.object({
  reason: yup.string().required('Please select a reason'),
  fullName: yup.string().trim().required('Full name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().required('Phone number is required'),
});

const REASONS = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

const initialValues: BookingFormValues = {
  reason: REASONS[0],
  fullName: '',
  email: '',
  phone: '',
};

export default function BookingForm({ teacher, onSuccess }: BookingFormProps) {
  async function handleSubmit(values: BookingFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Your trial lesson request has been sent!');
      onSuccess();
    } catch {
      toast.error('Failed to send request, please try again');
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={bookingSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h2 className={css.title}>Book trial lesson</h2>
          <p className={css.subtitle}>
            Our experienced tutor will assess your current language level, discuss your learning
            goals, and tailor the lesson to your specific needs.
          </p>

          <div className={css.teacherRow}>
            <Image
              src={teacher.avatar_url}
              alt={teacher.name}
              width={44}
              height={44}
              className={css.avatar}
            />
            <div>
              <p className={css.teacherLabel}>Your teacher</p>
              <p className={css.teacherName}>
                {teacher.name} {teacher.surname}
              </p>
            </div>
          </div>

          <fieldset className={css.reasons}>
            <legend className={css.legend}>What is your main reason for learning English?</legend>
            {REASONS.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <Field type="radio" name="reason" value={reason} className={css.radioInput} />
                {reason}
              </label>
            ))}
            <ErrorMessage name="reason" component="span" className={css.error} />
          </fieldset>

          <div className={css.field}>
            <Field type="text" name="fullName" placeholder="Full Name" className={css.input} />
            <ErrorMessage name="fullName" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <Field type="email" name="email" placeholder="Email" className={css.input} />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <Field type="tel" name="phone" placeholder="Phone number" className={css.input} />
            <ErrorMessage name="phone" component="span" className={css.error} />
          </div>

          <button type="submit" className={css.submitButton} disabled={isSubmitting}>
            Book
          </button>
        </Form>
      )}
    </Formik>
  );
}
