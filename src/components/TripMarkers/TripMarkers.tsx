import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Skeleton,
  Typography
} from "@mui/material";
import cx from "classnames";
import { groupBy } from "lodash";
import { EMarkerCategory, IAPIMarker } from "src/api/markers";
import { IAPITripDetails } from "src/api/trips";
import useSearchParam, { EGlobalSearchParams } from "src/hooks/useSearchParam";

import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";

import TripCard from "../TripCard/TripCard/TripCard";
import EmptyPlaceholder from "./EmptyPlaceholder";
import MarkerCategoryIcon from "./MarkerCategoryIcon";
import style from "./TripMarkers.module.scss";
import messages from "./messages";

type TProps = {
  trip?: IAPITripDetails;
  onMarkerSelected: (marker: IAPIMarker) => void;
};

const SKELETONS_COUNT = 5;

export default function TripMarkers({ trip, onMarkerSelected }: TProps) {
  const isLoading = !trip;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<IAPIMarker | null>(null);

  const searchQuery = useSearchParam(EGlobalSearchParams.Search);

  const isMarkersEmpty = !isLoading && trip.markers.length === 0;

  const displayableMarkers = useMemo(() => {
    if (isLoading) {
      return Object.values(EMarkerCategory)
        .filter(Number.isInteger)
        .slice(0, SKELETONS_COUNT)
        .map((category, id) => ({ id, category }));
    } else if (searchQuery) {
      return trip!.markers.filter((marker) =>
        marker.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return trip!.markers;
    }
  }, [trip, isLoading, searchQuery]);

  const tripGroups = useMemo(() => groupBy(displayableMarkers, "category"), [displayableMarkers]);

  const handleAccordionExpansion = (category: string, expanded: boolean) => {
    if (isLoading) return;
    setSelectedCategory(expanded ? category : null);
  };

  const handleSelectedMarker = (marker: IAPIMarker) => {
    setSelectedMarker(marker);
    onMarkerSelected(marker);
  };

  const markersView = isMarkersEmpty ? (
    <EmptyPlaceholder />
  ) : (
    Object.entries(tripGroups).map(([category, markers]) => (
      <Accordion
        expanded={category === selectedCategory}
        onChange={(_, expanded: boolean) => handleAccordionExpansion(category, expanded)}
        classes={{ expanded: style.expanded }}
      >
        <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
          <Grid
            container
            className={cx(style.header, { [style.selected]: category === selectedCategory })}
          >
            <Grid item md={2} paddingX={1}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <MarkerCategoryIcon category={+category as EMarkerCategory} />
              )}
            </Grid>
            <Grid item md={9} paddingX={1}>
              <Typography variant="body1">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FormattedMessage {...messages.categories[category].label} />
                )}
              </Typography>
            </Grid>
            <Grid item md={1} paddingX={1}>
              <Typography variant="body1">{isLoading ? <Skeleton /> : markers?.length}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          {!isLoading &&
            (markers as IAPIMarker[]).map((marker: IAPIMarker) => (
              <Button
                key={marker.id}
                fullWidth
                variant={selectedMarker?.id === marker.id ? "contained" : "text"}
                className={style.button}
                onClick={() => handleSelectedMarker(marker)}
              >
                <Typography variant="body1">{marker.title}</Typography>
              </Button>
            ))}
        </AccordionDetails>
      </Accordion>
    ))
  );

  return (
    <>
      <TripCard
        isLoading={isLoading}
        withContextMenu={false}
        interactive={false}
        trip={trip}
        classes={{ container: style.trip }}
      />
      {markersView}
    </>
  );
  return markersView;
}
