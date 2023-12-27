import { CircularProgress, Grid, Typography } from "@mui/material";
import { IAPIMarker } from "src/api/markers";
import Map from "src/components/Map/Map";
import TripMarkers from "src/components/TripMarkers/TripMarkers";
import useTrip from "src/hooks/useTrip";

import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import style from "./TripScreen.module.scss";
import messages from "./messages";

export default function TripScreen() {
  const { id: tripId } = useParams();
  const { trip } = useTrip(+tripId!);
  const [center, setCenter] = useState<IAPIMarker | undefined>();

  const handleMarkerSelected = (marker: IAPIMarker) => {
    setCenter(marker);
  };

  return (
    <Grid container>
      <Grid item md={2.5} className={style["side-menu"]}>
        <TripMarkers trip={trip} onMarkerSelected={handleMarkerSelected} />
      </Grid>

      <Grid item md={9.5} className={style["map-container"]}>
        {trip ? (
          <Map markers={trip.markers} center={center} />
        ) : (
          <>
            <CircularProgress size={144} />
            <Typography variant="h4" color="common.onBackground">
              <FormattedMessage {...messages.mapLoading} />
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
