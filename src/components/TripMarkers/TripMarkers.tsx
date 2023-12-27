import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ParkIcon from "@mui/icons-material/Park";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
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

import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";

import style from "./TripMarkers.module.scss";
import messages from "./messages";

type TProps = {
  trip?: IAPITripDetails;
  onMarkerSelected: (marker: IAPIMarker) => void;
};

function MarkerCategoryIcon({ category }: { category: EMarkerCategory }) {
  switch (category) {
    case EMarkerCategory.nature:
      return <ParkIcon />;
    case EMarkerCategory.shopping:
      return <ShoppingBagIcon />;
  }
}

const SKELETONS_COUNT = 5;

export default function TripMarkers({ trip, onMarkerSelected }: TProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<IAPIMarker | null>(null);

  const isLoading = !trip;

  const tripGroups = useMemo(() => {
    const markers = (isLoading
      ? Object.values(EMarkerCategory)
          .filter(Number.isInteger)
          .slice(0, SKELETONS_COUNT)
          .map((category) => ({ category }))
      : trip!.markers) as unknown as IAPIMarker[];

    return groupBy(markers, "category");
  }, [isLoading]);

  const handleAccordionExpansion = (category: string, expanded: boolean) => {
    if (isLoading) return;
    setSelectedCategory(expanded ? category : null);
  };

  const handleSelectedMarker = (marker: IAPIMarker) => {
    setSelectedMarker(marker);
    onMarkerSelected(marker);
  };

  return Object.entries(tripGroups).map(([category, markers]) => (
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
        {markers.map((marker: IAPIMarker) => (
          <Button
            variant={selectedMarker?.id === marker.id ? "contained" : "text"}
            fullWidth
            className={style.button}
            onClick={() => handleSelectedMarker(marker)}
          >
            <Typography variant="body1">{marker.title}</Typography>
          </Button>
        ))}
      </AccordionDetails>
    </Accordion>
  ));
}
