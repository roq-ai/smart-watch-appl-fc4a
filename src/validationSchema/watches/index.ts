import * as yup from 'yup';

export const watchValidationSchema = yup.object().shape({
  model: yup.string().required(),
  dial: yup.string().required(),
  time_setting: yup.string().required(),
  manufacturer_id: yup.string().nullable().required(),
});
