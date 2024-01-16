import { FormattedMessage } from "react-intl";

import { Grid, Typography } from "@mui/material";

import cx from "classnames";

import { EMarkerCategory } from "src/api/markers";
import useSkeleton from "src/hooks/useSkeleton";

import MarkerCategoryIcon from "./MarkerCategoryIcon";
import style from "./TripMarkers.module.scss";
import messages from "./messages";

type TProps = {
  category: EMarkerCategory;
  isLoading: boolean;
  count: number;
  isSelected: boolean;
};

export default function TripMarkerHeader({ category, isLoading, count, isSelected }: TProps) {
  const withSkeleton = useSkeleton({ isLoading });

  return (
    <Grid container className={cx(style.header, { [style.selected]: isSelected })}>
      <Grid item md={2} paddingX={1}>
        {withSkeleton(() => (
          <MarkerCategoryIcon category={category} />
        ))}
      </Grid>
      <Grid item md={9} paddingX={1}>
        <Typography variant="body1">
          {withSkeleton(<FormattedMessage {...messages.categories?.[category]?.label} />)}
        </Typography>
      </Grid>
      <Grid item md={1} paddingX={1}>
        <Typography variant="body1">{withSkeleton(count)}</Typography>
      </Grid>
    </Grid>
  );
}
