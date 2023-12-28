import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import cx from "classnames";
import { IAPITripCard } from "src/api/trips";

import style from "./BasicTripCard.module.scss";

export type TBasicTripCardProps = {
  trip: IAPITripCard;
  isLoading: boolean;
  onContextMenuOpened?: (event: React.MouseEvent) => void;
  onCardSelected?: (trip: IAPITripCard) => void;
};

export default function BasicTripCard({
  trip,
  isLoading,
  onContextMenuOpened,
  onCardSelected
}: TBasicTripCardProps) {
  const handleCardSelected = () => {
    if (onCardSelected) {
      onCardSelected(trip);
    }
  };

  return (
    <>
      <Card className={style.card} onContextMenu={onContextMenuOpened}>
        <CardActionArea disabled={isLoading} onClick={handleCardSelected}>
          {isLoading ? (
            <Skeleton classes={{ root: cx(style.image, style.skeleton) }} />
          ) : (
            <CardMedia
              component="img"
              image={trip.picture}
              alt={trip.name}
              className={style.image}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {isLoading ? <Skeleton /> : trip.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={style.description}>
              {isLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={`description-skeleton-${idx}`} />
                  ))
                : trip.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
