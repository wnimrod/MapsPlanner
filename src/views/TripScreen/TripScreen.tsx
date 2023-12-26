import { Divider, Grid, Skeleton, Typography } from "@mui/material";
import { IAPIMarker } from "src/api/markers";
import TripMarkers from "src/components/TripMarkers/TripMarkers";
import useTrip from "src/hooks/useTrip";

import { useParams } from "react-router-dom";

import style from "./TripScreen.module.scss";

console.log(style);

export default function TripScreen() {
  const { id: tripId } = useParams();
  const { trip, isLoading, error } = useTrip(+tripId!);

  const handleMarkerSelected = (marker: IAPIMarker) => {
    console.log(marker);
  };

  return (
    <Grid container>
      <Grid item md={3} className={style["side-menu"]}>
        <Typography variant="h6" color="common.onBackground" mb={1}>
          {isLoading ? <Skeleton /> : trip?.name}
        </Typography>
        <TripMarkers trip={trip} onMarkerSelected={handleMarkerSelected} />
      </Grid>
      <Divider orientation="vertical" flexItem />

      <Grid item md={9}>
        <div>Map view!</div>
      </Grid>
    </Grid>
  );
}
