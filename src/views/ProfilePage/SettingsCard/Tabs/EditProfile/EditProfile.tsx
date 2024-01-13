import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { EGender } from "src/api/users";
import useSkeleton from "src/hooks/useSkeleton";
import useUserProfile from "src/hooks/useUserProfile";
import useParams from "src/views/ProfilePage/useParams";

import { FormattedMessage, useIntl } from "react-intl";

import FormInput from "./FormInput";
import { createValidationSchema } from "./constants";
import messages from "./messages";

export default function EditProfile() {
  const { formatMessage } = useIntl();
  const { id: profileId } = useParams();
  const { isLoading, userProfile, editProfile } = useUserProfile(profileId);

  const { enqueueSnackbar } = useSnackbar();

  const { firstName, lastName, email, profilePicture, birthDate, gender } = userProfile || {};
  const initialValues = { firstName, lastName, email, gender, birthDate, profilePicture };

  const validationSchema = createValidationSchema(formatMessage);

  const {
    values,
    errors,
    isValid,
    isValidating,
    isSubmitting,
    setFieldValue,
    dirty,
    handleSubmit
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const keys = Object.keys(values) as (keyof typeof initialValues)[];
      const changes = keys.reduce((diff: any, nextField: keyof typeof initialValues) => {
        if (values[nextField] !== initialValues[nextField]) {
          diff[nextField] = values[nextField];
        }

        return diff;
      }, {});

      try {
        await editProfile(changes);
        enqueueSnackbar({
          message: formatMessage(messages.editSuccess),
          variant: "success"
        });
      } catch (error) {
        enqueueSnackbar({
          message: formatMessage(messages.editFailed),
          variant: "error"
        });
      } finally {
        formikHelpers.setSubmitting(false);
      }
    }
  });

  const withSkeleton = useSkeleton({ isLoading, height: 70 });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const skipFields = ["birthDate"]; // @TODO: Validation makes problem for these fields. skip for now.
    const { name: field } = event.target;
    let { value } = event.target;

    try {
      if (!skipFields.includes(field))
        value = validationSchema.validateSyncAt(field, { [field]: value });
    } catch (error) {
      console.debug(`Field ${field} not found in valdiation schema; falling back to given value.`);
    } finally {
      setFieldValue(field, value);
    }
  };

  return (
    <Grid container rowSpacing={2} columns={1} spacing={6}>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="firstName"
            value={values.firstName}
            error={!!errors.firstName}
            helperText={errors.firstName}
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="lastName"
            value={values.lastName}
            error={!!errors.lastName}
            helperText={errors.lastName}
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="email"
            value={values.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormControl>
            <FormLabel>
              <FormattedMessage {...messages.fields.gender.label} />
            </FormLabel>
            <RadioGroup row name="gender" value={values.gender} onChange={handleChange}>
              <FormControlLabel
                value={EGender.male}
                checked={values.gender === EGender.male}
                control={<Radio />}
                label={formatMessage(messages.fields.gender.male)}
              />
              <FormControlLabel
                value={EGender.female}
                checked={values.gender === EGender.female}
                control={<Radio />}
                label={formatMessage(messages.fields.gender.female)}
              />
            </RadioGroup>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            type="date"
            name="birthDate"
            error={!!errors.birthDate}
            helperText={errors.birthDate}
            value={values.birthDate}
            onChange={handleChange}
          />
        )}
      </Grid>
      <Grid item alignSelf="flex-end" textAlign="end" xs={1}>
        {withSkeleton(
          <Button
            size="large"
            onClick={() => handleSubmit()}
            variant="outlined"
            disabled={!isValid || isValidating || !dirty}
          >
            {isSubmitting && <CircularProgress size={12} sx={{ mr: 1 }} />}
            <FormattedMessage {...messages.submit} />
          </Button>,
          1,
          { width: 150 }
        )}
      </Grid>
    </Grid>
  );
}
