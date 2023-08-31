import * as yup from 'yup';

export const bluetoothValidationSchema = yup.object().shape({
  connectivity: yup.boolean().required(),
  watch_id: yup.string().nullable().required(),
});
