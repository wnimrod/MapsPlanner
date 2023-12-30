import { Button, Typography } from "@mui/material";
import { TAPIMarker } from "src/api/markers";

import style from "./TripMarkers.module.scss";

type TProps = {
  marker: TAPIMarker;
  isSelected: boolean;
  handleMarkerSelected: (marker: TAPIMarker) => void;
};

export default function TripMarkersBody({ marker, isSelected, handleMarkerSelected }: TProps) {
  return (
    <Button
      key={marker.id}
      fullWidth
      variant={isSelected ? "contained" : "text"}
      className={style.button}
      onClick={() => handleMarkerSelected(marker)}
    >
      <Typography variant="body1">{marker.title}</Typography>
    </Button>
  );
}
