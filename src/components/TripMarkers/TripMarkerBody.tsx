import { Button, Typography } from "@mui/material";

import { TAPIMarker } from "src/api/markers";

import style from "./TripMarkers.module.scss";

export type TTripMarkerBodyProps = {
  marker: TAPIMarker;
  isSelected: boolean;
  handleMarkerSelected: (marker: TAPIMarker) => void;
};

export default function TripMarkersBody(props: TTripMarkerBodyProps) {
  const { marker, isSelected, handleMarkerSelected } = props;

  return (
    <Button
      key={marker.id}
      fullWidth
      variant={isSelected ? "contained" : "text"}
      onClick={() => handleMarkerSelected(marker)}
      className={style.button}
    >
      <Typography variant="body1">{marker.title}</Typography>
    </Button>
  );
}
