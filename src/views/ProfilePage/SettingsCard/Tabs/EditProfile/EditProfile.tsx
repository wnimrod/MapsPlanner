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
import useSkeleton from "src/hooks/useSkeleton";
import useUserProfile from "src/hooks/useUserProfile";
import useParams from "src/views/ProfilePage/useParams";

import { FormattedMessage, useIntl } from "react-intl";

import FormInput from "./FormInput";
import { validationSchema } from "./constants";
import messages from "./messages";

export default function EditProfile() {
  const { formatMessage } = useIntl();
  const { id: profileId } = useParams();
  const { isLoading, userProfile, editProfile } = useUserProfile(profileId);

  const { enqueueSnackbar } = useSnackbar();

  const { firstName, lastName, email, profilePicture, birthDate, gender } = userProfile || {};
  const initialValues = { firstName, lastName, email, gender, birthDate, profilePicture };

  const form = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema(formatMessage),
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

  console.log(form.values);

  return (
    <Grid container rowSpacing={2} columns={2} spacing={6}>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="firstName"
            value={form.values.firstName}
            error={!!form.errors.firstName}
            helperText={form.errors.firstName}
            onChange={form.handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="lastName"
            value={form.values.lastName}
            error={!!form.errors.lastName}
            helperText={form.errors.lastName}
            onChange={form.handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormInput
            name="email"
            value={form.values.email}
            error={!!form.errors.email}
            helperText={form.errors.email}
            onChange={form.handleChange}
          />
        )}
      </Grid>
      <Grid item xs={1}>
        {withSkeleton(
          <FormControl>
            <FormLabel>
              <FormattedMessage {...messages.fields.gender.label} />
            </FormLabel>
            <RadioGroup row name="gender" value={form.values.gender} onChange={form.handleChange}>
              <FormControlLabel
                value="M"
                checked={form.values.gender === "M"}
                control={<Radio />}
                label={formatMessage(messages.fields.gender.male)}
              />
              <FormControlLabel
                value="F"
                checked={form.values.gender === "F"}
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
            error={!!form.errors.birthDate}
            helperText={form.errors.birthDate}
            value={form.values.birthDate}
            onChange={form.handleChange}
          />
        )}
      </Grid>
      <Grid item alignSelf="flex-end" textAlign="end" xs={1}>
        {withSkeleton(
          <Button
            size="large"
            onClick={() => form.handleSubmit()}
            variant="outlined"
            disabled={!form.isValid || form.isValidating || !form.dirty}
          >
            {form.isSubmitting && <CircularProgress size={12} sx={{ mr: 1 }} />}
            <FormattedMessage {...messages.submit} />
          </Button>,
          1,
          { width: 150 }
        )}
      </Grid>
    </Grid>
  );
}
