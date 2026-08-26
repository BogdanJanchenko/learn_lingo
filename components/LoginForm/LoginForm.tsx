'use client';

import { useId, useState } from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { loginUser } from '@/lib/firebase/auth';
import Loader from '@/components/Loader/Loader';
import css from './LoginForm.module.css';

interface LoginFormProps {
  onSuccess: () => void;
}

interface FormValues {
  userEmail: string;
  userPassword: string;
}

const initialValues: FormValues = {
  userEmail: '',
  userPassword: '',
};

const validationSchema = yup.object({
  userEmail: yup
    .string()
    .trim()
    .email('Please enter your email address')
    .required('Please enter your email address'),
  userPassword: yup
    .string()
    .min(8, 'Required. Min length 8 chars')
    .required('Required. Min length 8 chars'),
});

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  const userEmailID = useId();
  const userPasswordID = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Welcome back!');
      onSuccess();
    },
    onError: () => {
      toast.error('Something went wrong, try again');
    },
  });

  function handleShowPass() {
    setIsPassVisible((prev) => !prev);
  }

  function handleSubmit(values: FormValues, { resetForm }: FormikHelpers<FormValues>) {
    mutate(
      { email: values.userEmail, password: values.userPassword },
      { onSuccess: () => resetForm() }
    );
  }

  return (
    <>
      {isPending && <Loader />}

      <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and continue your search
        for a teacher.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className={css.form}>
            <div className={css.labelInputContainer}>
              <input
                className={css.input}
                type="email"
                name="userEmail"
                id={userEmailID}
                placeholder="Email"
                autoComplete="email"
                value={values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userEmail && touched.userEmail && (
                <p className={css.error}>{errors.userEmail}</p>
              )}
            </div>

            <div className={css.labelInputContainer}>
              <div className={css.passwordWrapper}>
                <input
                  className={css.input}
                  name="userPassword"
                  id={userPasswordID}
                  type={isPassVisible ? 'text' : 'password'}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={values.userPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button onClick={handleShowPass} type="button" className={css.showHidePassButton}>
                  {isPassVisible ? (
                    <GoEye className={css.showHidePassIcon} />
                  ) : (
                    <GoEyeClosed className={css.showHidePassIcon} />
                  )}
                </button>
              </div>
              {errors.userPassword && touched.userPassword && (
                <p className={css.error}>{errors.userPassword}</p>
              )}
            </div>

            <button type="submit" className={css.submitButton} disabled={isPending}>
              {isPending ? 'Logging in...' : 'Log In'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
