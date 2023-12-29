import { CircularProgress, Grid, Typography } from "@mui/material";
import { TAPIMarker } from "src/api/markers";
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
  const [center, setCenter] = useState<TAPIMarker | undefined>();

  const handleMarkerSelected = (marker: TAPIMarker) => {
    setCenter(marker);
  };

  return (
    <Grid container>
      <Grid item md={2.5} className={style.sideMenu}>
        <TripMarkers trip={trip} onMarkerSelected={handleMarkerSelected} />
      </Grid>

      <Grid item md={9.5} className={style.mapContainer}>
        {trip ? (
          <Map trip={trip} center={center} />
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
