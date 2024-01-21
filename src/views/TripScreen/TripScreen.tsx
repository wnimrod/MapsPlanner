import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { Map } from "src/components/Map";
import { EMapProvider } from "src/components/Map/Maps/types";
import TripCard from "src/components/TripCard/TripCard/TripCard";
import { tripCardActionManifest } from "src/components/TripCard/TripCard/manifest";
import TripMarkers from "src/components/TripMarkers/TripMarkers";

import { TAPIMarker } from "src/api/types";
import useTrip from "src/hooks/useTrip";

import style from "./TripScreen.module.scss";
import messages from "./messages";

export default function TripScreen() {
  const { id: tripId } = useParams();
  const { trip, isLoading } = useTrip(+tripId!);
  const [center, setCenter] = useState<TAPIMarker | undefined>();

  const handleMarkerSelected = (marker: TAPIMarker) => {
    setCenter(marker);
  };

  return (
    <Grid container>
      <Grid item md={2.5} className={style.sideMenu}>
        <TripCard
          trip={trip}
          isLoading={isLoading}
          onCardSelected={undefined}
          actions={tripCardActionManifest}
          classes={{ container: style.trip }}
        />
        <TripMarkers trip={trip} onMarkerSelected={handleMarkerSelected} />
      </Grid>

      <Grid item md={9.5} className={style.mapContainer}>
        {trip ? (
          <Map provider={EMapProvider.OpenStreetMap} trip={trip} center={center} />
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
