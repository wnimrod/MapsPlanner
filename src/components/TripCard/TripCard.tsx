import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import cx from "classnames";
import { IAPITripCard } from "src/api/trips";
import useContextMenu from "src/hooks/useContextMenu";
import { useTrips } from "src/hooks/useTrips";
import { ERoute } from "src/routes";
import { setAlert } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ContextMenu, ETripCardActions } from "./ContextMenu";
import style from "./TripCard.module.scss";

type TProps = {
  trip: IAPITripCard;
  isLoading: boolean;
};

export default function TripCard({ trip, isLoading }: TProps) {
  const { deleteTrip } = useTrips();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuAction = async (action?: ETripCardActions) => {
    switch (action) {
      case ETripCardActions.Delete:
        try {
          await deleteTrip(trip.id);
          dispatch(
            setAlert({
              message: `Trip \`${trip.name}\` deleted successfully.`,
              severity: "success"
            })
          );
        } catch (error) {
          dispatch(
            setAlert({ message: `Failed to delete trip \`${trip.name}\``, severity: "error" })
          );
        }

        break;
    }
  };

  const {
    handleContextMenuClosed: handleClose,
    handleContextMenuOpened,
    menuProps
  } = useContextMenu(handleMenuAction);

  const handleCardSelected = () => {
    navigate(ERoute.Trip.replace(":id", trip.id.toString()));
  };
  return (
    <>
      <Card className={style.card} onContextMenu={handleContextMenuOpened}>
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
              {isLoading ? Array(4).fill(<Skeleton />) : trip.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <ContextMenu {...menuProps} handleClose={handleClose} />
    </>
  );
}
