'use client';

import { useId, useState } from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { registerUser } from '@/lib/firebase/auth';
import Loader from '@/components/Loader/Loader';
import css from './RegisterForm.module.css';

interface RegisterFormProps {
  onSuccess: () => void;
}

interface FormValues {
  userName: string;
  userEmail: string;
  userPassword: string;
}

const initialValues: FormValues = {
  userName: '',
  userEmail: '',
  userPassword: '',
};

const validationSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .max(20, 'Maximum 20 characters')
    .required('Please enter your full name'),
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

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  const userNameID = useId();
  const userEmailID = useId();
  const userPasswordID = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registration successful!');
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
      { name: values.userName, email: values.userEmail, password: values.userPassword },
      { onSuccess: () => resetForm() }
    );
  }

  return (
    <>
      {isPending && <Loader />}

      <h2 className={css.title}>Registration</h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we need some information.
        Please provide us with the following information
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
                type="text"
                name="userName"
                id={userNameID}
                placeholder="Name"
                autoComplete="name"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && touched.userName && (
                <p className={css.error}>{errors.userName}</p>
              )}
            </div>

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
                  autoComplete="new-password"
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
              {isPending ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
