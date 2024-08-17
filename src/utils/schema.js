import * as Yup from 'yup';

export const emailSchema = Yup.string().required('Email is required').email('Should be email');

export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(4, 'Password should be longer than 4 characters');

export const confirmPasswordSchema = (ref) =>
  Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref(ref)], 'Passwords should match');
