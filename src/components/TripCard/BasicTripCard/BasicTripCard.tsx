import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import cx from "classnames";
import { IAPITripCard } from "src/api/trips";
import { ConditionalWrap } from "src/utils/utils";

import { ReactNode } from "react";

import style from "./BasicTripCard.module.scss";

export type TBasicTripCardProps = {
  trip?: IAPITripCard;
  isLoading: boolean;
  onContextMenuOpened?: (event: React.MouseEvent) => void;
  onCardSelected?: (trip: IAPITripCard) => void;
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
    interactive = true,
    classes = {}
  } = props;

  const onContextMenuOpened = interactive ? _onContextMenuOpened : undefined;
  const onCardSelected = interactive ? _onCardSelected : undefined;

  const handleCardSelected = () => {
    if (onCardSelected && trip) {
      onCardSelected(trip);
    }
  };

  const makeInteractive = (children: ReactNode) => (
    <CardActionArea disabled={!interactive} onClick={handleCardSelected}>
      {children}
    </CardActionArea>
  );

  return (
    <Card className={cx(style.card, classes.container)} onContextMenu={onContextMenuOpened}>
      <ConditionalWrap condition={interactive} wrapper={makeInteractive}>
        {isLoading ? (
          <Skeleton classes={{ root: cx(style.image, style.skeleton) }} />
        ) : (
          <CardMedia
            component="img"
            image={trip?.picture}
            alt={trip?.name}
            className={style.image}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {isLoading ? <Skeleton /> : trip?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={style.description}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={`description-skeleton-${idx}`} />
                ))
              : trip?.description}
          </Typography>
        </CardContent>
      </ConditionalWrap>
    </Card>
  );
}
