import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  watch_id: yup.string().nullable().required(),
});
