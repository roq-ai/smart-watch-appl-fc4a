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

import { createBluetooth } from 'apiSdk/bluetooths';
import { bluetoothValidationSchema } from 'validationSchema/bluetooths';
import { WatchInterface } from 'interfaces/watch';
import { getWatches } from 'apiSdk/watches';
import { BluetoothInterface } from 'interfaces/bluetooth';

function BluetoothCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BluetoothInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBluetooth(values);
      resetForm();
      router.push('/bluetooths');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BluetoothInterface>({
    initialValues: {
      connectivity: false,
      watch_id: (router.query.watch_id as string) ?? null,
    },
    validationSchema: bluetoothValidationSchema,
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
              label: 'Bluetooths',
              link: '/bluetooths',
            },
            {
              label: 'Create Bluetooth',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Bluetooth
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="connectivity"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.connectivity}
          >
            <FormLabel htmlFor="switch-connectivity">Connectivity</FormLabel>
            <Switch
              id="switch-connectivity"
              name="connectivity"
              onChange={formik.handleChange}
              value={formik.values?.connectivity ? 1 : 0}
            />
            {formik.errors?.connectivity && <FormErrorMessage>{formik.errors?.connectivity}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<WatchInterface>
            formik={formik}
            name={'watch_id'}
            label={'Select Watch'}
            placeholder={'Select Watch'}
            fetcher={getWatches}
            labelField={'model'}
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
              onClick={() => router.push('/bluetooths')}
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
    entity: 'bluetooth',
    operation: AccessOperationEnum.CREATE,
  }),
)(BluetoothCreatePage);
