import { FormattedMessage, useIntl } from "react-intl";

import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Popover,
  PopoverProps,
  Select,
  TextField,
  Typography
} from "@mui/material";

import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { ALL_MARKER_CATEGORIES } from "src/api/markers/markers";
import { EMarkerCategory, TAPIMarkerCreationRequest, TAPITripCard } from "src/api/types";
import useTrip from "src/hooks/useTrip";
import MarkerCategoryIcon from "src/ui/atoms/MarkerCategoryIcon/MarkerCategoryIcon";

import style from "./AddMarkerPopover.module.scss";
import messages from "./messages";

type TProps = {
  anchorPosition: PopoverProps["anchorPosition"];
  latitude: number;
  longitude: number;
  trip: TAPITripCard;
  onClose: () => void;
};

export default function AddMarkerPopover({
  anchorPosition,
  latitude,
  longitude,
  trip,
  onClose
}: TProps) {
  const { addMarker } = useTrip(trip.id);
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, formatMessage(messages.validation.title.min))
      .required(formatMessage(messages.validation.title.required))
  });

  const form = useFormik<TAPIMarkerCreationRequest>({
    initialValues: {
      tripId: trip.id,
      latitude,
      longitude,
      category: EMarkerCategory.nature,
      title: "",
      description: ""
    },
    isInitialValid: false,
    onSubmit: async (markerCreationRequest: TAPIMarkerCreationRequest, formikHelpers) => {
      try {
        formikHelpers.setSubmitting(true);
        await addMarker(markerCreationRequest);
        formikHelpers.resetForm();
      } catch (error) {
        enqueueSnackbar(formatMessage(messages.errors.failedToAddMarker), { variant: "error" });
      } finally {
        formikHelpers.setSubmitting(false);
        onClose();
      }
    },
    validationSchema
  });

  return (
    <Popover
      open={!!anchorPosition}
      id={`add-marker-${trip.id}`}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={onClose}
      onContextMenuCapture={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <Grid container direction="column" width={350} padding={1} spacing={1}>
        <Grid item>
          <Typography variant="h6">
            <FormattedMessage {...messages.labels.header} />
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            name="title"
            label={formatMessage(messages.labels.title)}
            value={form.values.title}
            onChange={form.handleChange}
            error={!!form.errors.title}
            helperText={form.errors.title}
          />
        </Grid>
        <Grid item>
          <Select
            fullWidth
            name="category"
            label={formatMessage(messages.labels.category)}
            value={form.values.category}
            onChange={form.handleChange}
            classes={{ select: style.selectCategory }}
          >
            {ALL_MARKER_CATEGORIES.map((category) => (
              <MenuItem value={category} classes={{ root: style.selectCategory }}>
                <MarkerCategoryIcon category={category} />
                <FormattedMessage {...messages.labels.categories[category]} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            multiline
            name="description"
            label={formatMessage(messages.labels.description)}
            onChange={form.handleChange}
            value={form.values.description}
            error={!!form.errors.description}
            helperText={form.errors.description}
            rows={3}
            maxRows={5}
          />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item alignSelf="flex-end">
          <Button
            onClick={form.submitForm}
            variant="contained"
            startIcon={form.isSubmitting && <CircularProgress size={12} color="inherit" />}
            disabled={form.isSubmitting || !form.isValid}
          >
            <FormattedMessage {...messages.actions.save} />
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
}
