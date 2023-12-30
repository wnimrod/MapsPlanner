import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { groupBy } from "lodash";
import { ALL_MARKER_CATEGORIES, EMarkerCategory, TAPIMarker } from "src/api/markers";
import { TAPITripDetails } from "src/api/trips";
import useSearchParam, { EGlobalSearchParams } from "src/hooks/useSearchParam";

import { useMemo, useState } from "react";

import TripCard from "../TripCard/TripCard/TripCard";
import { tripCardActionManifest } from "../TripCard/TripCard/manifest";
import MarkerGeneratorButton from "./MarkerGeneratorButton";
import TripMarkersBody from "./TripMarkerBody";
import TripMarkerHeader from "./TripMarkerHeader";
import style from "./TripMarkers.module.scss";

type TProps = {
  trip?: TAPITripDetails;
  onMarkerSelected: (marker: TAPIMarker) => void;
};

const SKELETONS_COUNT = 5;

export default function TripMarkers({ trip, onMarkerSelected }: TProps) {
  const isLoading = !trip;

  const [selectedCategory, setSelectedCategory] = useState<EMarkerCategory | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<TAPIMarker | null>(null);

  const searchQuery = useSearchParam(EGlobalSearchParams.Search);

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

  const tripGroups = useMemo(() => {
    const groups = groupBy(displayableMarkers, "category");
    for (const category of ALL_MARKER_CATEGORIES) {
      if (!Object.prototype.hasOwnProperty.call(groups, category)) {
        groups[category] = [];
      }
    }

    return groups;
  }, [displayableMarkers]);

  const handleAccordionExpansion = (category: EMarkerCategory, expanded: boolean) => {
    if (isLoading) return;

    setSelectedCategory(expanded ? category : null);
  };

  const handleMarkerSelected = (marker: TAPIMarker) => {
    setSelectedMarker(marker);
    onMarkerSelected(marker);
  };

  const markersView = Object.entries(tripGroups).map(([_category, markers]) => {
    const category = +_category as EMarkerCategory; // Object keys are always strings; EMarkerCategory is number enum.

    return (
      <Accordion
        expanded={category === selectedCategory}
        onChange={(_, expanded: boolean) => handleAccordionExpansion(category, expanded)}
        classes={{ expanded: style.expanded }}
      >
        <AccordionSummary>
          <TripMarkerHeader
            category={category}
            isLoading={isLoading}
            count={markers?.length || 0}
            isSelected={category === selectedCategory}
          />
        </AccordionSummary>
        <AccordionDetails>
          {!isLoading && (
            <>
              <MarkerGeneratorButton
                category={category}
                tripId={trip.id}
                fullWidth
                sx={{ mb: 1, textWrap: "nowrap" }}
              />
              {(markers as TAPIMarker[]).map((marker: TAPIMarker) => (
                <>
                  <TripMarkersBody
                    key={marker.id}
                    isSelected={selectedMarker?.id === marker.id}
                    marker={marker}
                    handleMarkerSelected={handleMarkerSelected}
                  />
                </>
              ))}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      <TripCard
        isLoading={isLoading}
        onCardSelected={undefined}
        actions={tripCardActionManifest}
        trip={trip}
        classes={{ container: style.trip }}
      />
      <div className={style.markersContainer}>{markersView}</div>
    </>
  );
}
