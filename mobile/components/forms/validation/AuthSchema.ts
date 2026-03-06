import * as yup from 'yup';

export const authSchema = yup.object({
    isLogin: yup.boolean(),
    name: yup.string().when('isLogin', (isLoginValue, schema) =>
      isLoginValue ? schema.notRequired() : schema.required('Name is required')
    ),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(6, 'Min 6 chars'),
    confirmPassword: yup.string().when('isLogin', (isLoginValue, schema) =>
      isLoginValue
        ? schema.notRequired()
        : schema.oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password')
    ),
  });