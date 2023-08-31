import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getWatchById, updateWatchById } from 'apiSdk/watches';
import { watchValidationSchema } from 'validationSchema/watches';
import { WatchInterface } from 'interfaces/watch';
import { ManufacturerInterface } from 'interfaces/manufacturer';
import { getManufacturers } from 'apiSdk/manufacturers';

function WatchEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<WatchInterface>(
    () => (id ? `/watches/${id}` : null),
    () => getWatchById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: WatchInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateWatchById(id, values);
      mutate(updated);
      resetForm();
      router.push('/watches');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<WatchInterface>({
    initialValues: data,
    validationSchema: watchValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Watches',
              link: '/watches',
            },
            {
              label: 'Update Watch',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Watch
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.model}
            label={'Model'}
            props={{
              name: 'model',
              placeholder: 'Model',
              value: formik.values?.model,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dial}
            label={'Dial'}
            props={{
              name: 'dial',
              placeholder: 'Dial',
              value: formik.values?.dial,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.time_setting}
            label={'Time Setting'}
            props={{
              name: 'time_setting',
              placeholder: 'Time Setting',
              value: formik.values?.time_setting,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ManufacturerInterface>
            formik={formik}
            name={'manufacturer_id'}
            label={'Select Manufacturer'}
            placeholder={'Select Manufacturer'}
            fetcher={getManufacturers}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/watches')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'watch',
    operation: AccessOperationEnum.UPDATE,
  }),
)(WatchEditPage);
