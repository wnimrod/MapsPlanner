import { useMemo, useState } from "react";

import { groupBy } from "lodash";

import { ALL_MARKER_CATEGORIES, EMarkerCategory, TAPIMarker } from "src/api/markers";
import { TAPITripDetails } from "src/api/trips";
import useSearchParam, { EGlobalSearchParams } from "src/hooks/useSearchParam";

import TripMarkerCategory from "./TripMarkerCategory";
import style from "./TripMarkers.module.scss";

type TProps = {
  trip?: TAPITripDetails;
  onMarkerSelected: (marker: TAPIMarker) => void;
};

const SKELETONS_COUNT = 5;

export default function TripMarkers({ trip, onMarkerSelected }: TProps) {
  const isLoading = !trip;

  const [selectedCategory, setSelectedCategory] = useState<EMarkerCategory | null>(null);

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

    return Object.entries(groups).map(
      ([category, markers]) =>
        [+category as EMarkerCategory, markers as TAPIMarker[]] as [EMarkerCategory, TAPIMarker[]]
    );
  }, [displayableMarkers]);

  const handleAccordionExpansion = (category: EMarkerCategory, expanded: boolean) => {
    if (isLoading) return;

    setSelectedCategory(expanded ? category : null);
  };

  const handleMarkerSelected = (marker: TAPIMarker) => {
    onMarkerSelected(marker);
  };

  return (
    <div className={style.markersContainer}>
      {tripGroups.map(([category, markers]) => (
        <TripMarkerCategory
          category={category}
          isLoading={isLoading}
          isSelected={category === selectedCategory}
          markers={markers as TAPIMarker[]}
          onAccordionExpansion={handleAccordionExpansion}
          onMarkerSelected={handleMarkerSelected}
          tripId={trip?.id}
        />
      ))}
    </div>
  );
}
