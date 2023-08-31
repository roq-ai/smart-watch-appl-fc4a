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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createWatch } from 'apiSdk/watches';
import { watchValidationSchema } from 'validationSchema/watches';
import { ManufacturerInterface } from 'interfaces/manufacturer';
import { getManufacturers } from 'apiSdk/manufacturers';
import { WatchInterface } from 'interfaces/watch';

function WatchCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WatchInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWatch(values);
      resetForm();
      router.push('/watches');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WatchInterface>({
    initialValues: {
      model: '',
      dial: '',
      time_setting: '',
      manufacturer_id: (router.query.manufacturer_id as string) ?? null,
    },
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
              label: 'Create Watch',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Watch
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
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
    operation: AccessOperationEnum.CREATE,
  }),
)(WatchCreatePage);
