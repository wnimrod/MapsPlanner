import { Button, Typography } from "@mui/material";

import { TAPIMarker } from "src/api/markers";

import style from "./TripMarkerItem.module.scss";

export type TTripMarkerItemProps = {
  marker: TAPIMarker;
  isSelected: boolean;
  handleMarkerSelected: (marker: TAPIMarker) => void;
};

export default function TripMarkerItem(props: TTripMarkerItemProps) {
  const { marker, isSelected, handleMarkerSelected } = props;

  return (
    <Button
      key={marker.id}
      fullWidth
      variant={isSelected ? "contained" : "text"}
      onClick={() => handleMarkerSelected(marker)}
      className={style.item}
    >
      <Typography variant="body1">{marker.title}</Typography>
    </Button>
  );
}
