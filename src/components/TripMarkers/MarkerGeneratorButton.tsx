import IconAutoFixHigh from "@mui/icons-material/AutoFixHigh";
import { Button, ButtonProps, LinearProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { EMarkerCategory } from "src/api/markers";
import useTrip from "src/hooks/useTrip";

import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import message from "./messages";

type TProps = {
  tripId: number;
  category: EMarkerCategory;
} & ButtonProps;

export default function MarkerGeneratorButton({ tripId, category, ...buttonProps }: TProps) {
  const { formatMessage } = useIntl();
  const { generateMarkers } = useTrip(tripId);
  const [isGenerating, setIsGenerating] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleMarkerGeneration = async () => {
    setIsGenerating(true);
    try {
      const markers = await generateMarkers({ tripId, categories: [category] });
      enqueueSnackbar(formatMessage(message.generateMarkers.success, { count: markers.length }), {
        variant: "info"
      });
    } catch (error) {
      enqueueSnackbar(formatMessage(message.generateMarkers.error), { variant: "error" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleMarkerGeneration}
      variant="contained"
      disabled={isGenerating}
      {...buttonProps}
    >
      <IconAutoFixHigh fontSize="small" sx={{ mr: 1 }} />
      {isGenerating ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : (
        <Typography variant="body1">
          <FormattedMessage {...message.generateMarkers.label} />
        </Typography>
      )}
    </Button>
  );
}
