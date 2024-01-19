import { useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { type TTripMarkerItemProps, TripMarkerItem } from "src/components/TripMarkers";

import { EMarkerCategory, TAPIMarker } from "src/api/markers";

import TripMarkerHeader from "../TripMarkerHeader/TripMarkerHeader";
import MarkerGeneratorButton from "./MarkerGeneratorButton";
import style from "./TripMarkerCategory.module.scss";

type TProps = {
  category: EMarkerCategory;
  tripId?: number;
  isLoading: boolean;
  markers: TAPIMarker[]; // Marker IDs
  isSelected: boolean;
  onAccordionExpansion: (category: EMarkerCategory, expanded: boolean) => void;
  onMarkerSelected: TTripMarkerItemProps["handleMarkerSelected"];
};

export default function TripMarkerCategory({
  category,
  markers,
  tripId,
  isSelected,
  isLoading,
  onAccordionExpansion,
  onMarkerSelected
}: TProps) {
  const [selectedMarker, setSelectedMarker] = useState<TAPIMarker | null>(null);

  const handleMarkerSelected = (marker: TAPIMarker) => {
    setSelectedMarker(marker);
    if (onMarkerSelected) {
      onMarkerSelected(marker);
    }
  };

  return (
    <Accordion
      expanded={isSelected}
      onChange={(_, expanded: boolean) => onAccordionExpansion(category, expanded)}
      classes={{ expanded: style.expanded }}
    >
      <AccordionSummary>
        <TripMarkerHeader
          category={category}
          isLoading={isLoading}
          count={markers?.length || 0}
          isSelected={isSelected}
        />
      </AccordionSummary>
      <AccordionDetails>
        {!isLoading && (
          <>
            <MarkerGeneratorButton
              category={category}
              tripId={tripId!}
              fullWidth
              sx={{ mb: 1, textWrap: "nowrap" }}
            />
            {markers.map((marker: TAPIMarker) => (
              <TripMarkerItem
                key={marker.id}
                marker={marker}
                isSelected={marker.id === selectedMarker?.id}
                handleMarkerSelected={handleMarkerSelected}
              />
            ))}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
