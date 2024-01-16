import { FormattedMessage, useIntl } from "react-intl";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField
} from "@mui/material";

import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

import { useTrips } from "src/hooks/useTrips";
import { Image } from "src/ui/atoms";

import style from "./AddTripModal.module.scss";
import * as FormComponents from "./FormComponents";
import messages from "./messages";
import { TCreateTripForm } from "./types";

type TProps = {
  isOpen: boolean;
  onClose: (reason: "finished" | "cancel" | "backdropClick" | "escapeKeyDown") => void;
};

export default function AddTripModal({ isOpen, onClose }: TProps) {
  const { createTrip } = useTrips();

  const { formatMessage } = useIntl();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Common, this one really short ...").required("Please put it a name.")
  });

  const form = useFormik<TCreateTripForm>({
    initialValues: {
      name: "",
      description: "",
      pictureSource: "file",
      picture: ""
    },
    onSubmit: async (values: TCreateTripForm, helpers: FormikHelpers<TCreateTripForm>) => {
      if (!form.isValid) return;

      helpers.setSubmitting(true);
      try {
        await createTrip({
          name: values.name,
          description: values.description,
          picture: values.picture
        });
        helpers.resetForm();
        onClose("finished");
      } finally {
        form.setSubmitting(false);
      }
    },
    validationSchema
  });

  const handleCancel = () => {
    form.resetForm();
    onClose("cancel");
  };

  return (
    <Dialog open={isOpen} onClose={(_, reason) => onClose(reason)} maxWidth="lg">
      <DialogTitle>
        <FormattedMessage {...messages.name} />
      </DialogTitle>
      <DialogContent className={style.container}>
        <Grid container columns={20}>
          <Grid item xs={9.5}>
            <div className={style.form}>
              <Image
                fallback="add-trip.jpg"
                src={form.values.picture}
                alt={formatMessage(messages.tooltips.picture)}
                className={style.picture}
                onError={() => form.setFieldError("picture", "Invalid Image URL")}
              />
              <FormComponents.PictureSource
                field="pictureSource"
                value={form.values.pictureSource}
                onChange={form.handleChange}
              />
              <FormComponents.PictureInput
                field="picture"
                value={form.values.picture}
                onChange={(eventOrPicture: React.ChangeEvent<HTMLInputElement> | string) => {
                  if (typeof eventOrPicture === "string") {
                    form.setFieldValue("picture", eventOrPicture);
                  } else {
                    return form.handleChange(eventOrPicture);
                  }
                }}
                pictureSource={form.values.pictureSource}
                error={form.errors.picture}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical">&nbsp;</Divider>
          </Grid>
          <Grid item xs={9.5}>
            <Grid container columns={1} rowGap={3}>
              <Grid item xs={1}>
                <TextField
                  fullWidth
                  label="Trip Name"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  error={!!form.errors.name}
                  helperText={form.errors.name}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  multiline
                  maxRows={10}
                  fullWidth
                  label="Trip Description"
                  name="description"
                  value={form.values.description}
                  onChange={form.handleChange}
                  error={!!form.errors.description}
                  helperText={form.errors.description}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions className={style.actions}>
        <Button onClick={handleCancel} variant="outlined">
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          onClick={form.submitForm}
          variant="contained"
          disabled={!form.isValid || form.isSubmitting}
        >
          <FormattedMessage {...messages.submit} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
