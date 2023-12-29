import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import cx from "classnames";
import { TAPITripCard } from "src/api/trips";
import useSkeleton from "src/hooks/useSkeleton";
import { ConditionalWrap } from "src/utils/utils";

import { ReactNode } from "react";

import style from "./BasicTripCard.module.scss";

export type TBasicTripCardProps = {
  trip?: TAPITripCard;
  isLoading: boolean;
  onContextMenuOpened?: (event: React.MouseEvent) => void;
  onCardSelected?: (trip: TAPITripCard) => void;
  interactive?: boolean;
  classes?: Partial<{
    container: string;
  }>;
};

export default function BasicTripCard(props: TBasicTripCardProps) {
  const {
    trip,
    isLoading,
    onContextMenuOpened: _onContextMenuOpened,
    onCardSelected: _onCardSelected,
    interactive: _interactive = true,
    classes = {}
  } = props;

  const interactive = _interactive && !isLoading;

  const withSkeleton = useSkeleton({ isLoading });

  const onContextMenuOpened = interactive ? _onContextMenuOpened : undefined;
  const onCardSelected = interactive ? _onCardSelected : undefined;

  const handleCardSelected = () => {
    if (onCardSelected && trip) {
      onCardSelected(trip);
    }
  };

  const makeInteractive = (children: ReactNode) => (
    <CardActionArea
      classes={{ root: style.actionArea }}
      disabled={!interactive}
      onClick={handleCardSelected}
    >
      <div className={style.container}>{children}</div>
    </CardActionArea>
  );

  return (
    <Card className={cx(style.card, classes.container)} onContextMenu={onContextMenuOpened}>
      <ConditionalWrap condition={interactive} wrapper={makeInteractive}>
        {withSkeleton(
          <CardMedia
            component="img"
            image={trip?.picture}
            alt={trip?.name}
            className={style.image}
          />,
          1,
          { classes: { root: cx(style.image, style.skeleton) } }
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {withSkeleton(trip?.name)}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={style.description}>
            {withSkeleton(trip?.description, 4)}
          </Typography>
        </CardContent>
      </ConditionalWrap>
    </Card>
  );
}
