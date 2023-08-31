import * as yup from 'yup';

export const healthCheckValidationSchema = yup.object().shape({
  heart_rate: yup.boolean().required(),
  spo2: yup.boolean().required(),
  watch_id: yup.string().nullable().required(),
});
