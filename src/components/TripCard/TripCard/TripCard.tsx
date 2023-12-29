import { IAPITripCard } from "src/api/trips";
import useContextMenu from "src/hooks/useContextMenu";
import { useTrips } from "src/hooks/useTrips";
import { ERoute } from "src/routes";
import { setAlert } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BasicTripCard, { TBasicTripCardProps } from "../BasicTripCard/BasicTripCard";
import { ContextMenu, ETripCardActions } from "./ContextMenu";
import messages from "./messages";

type TProps = {
  withContextMenu?: boolean;
} & TBasicTripCardProps;

export default function TripCard({ trip, isLoading, ...basicCardProps }: TProps) {
  const { formatMessage } = useIntl();

  const { deleteTrip } = useTrips();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuAction = async (action?: ETripCardActions) => {
    if (!trip) return;

    switch (action) {
      case ETripCardActions.Delete: {
        const confirmDeleteTrip = await window.confirmDialog(messages.confirmDeleteTripDialog, {
          tripName: trip.name
        });

        if (!confirmDeleteTrip) return;

        try {
          await deleteTrip(trip.id);
          dispatch(
            setAlert({
              message: formatMessage(messages.info.delete, { tripName: trip.name }),
              severity: "success"
            })
          );
        } catch (error) {
          dispatch(
            setAlert({
              message: formatMessage(messages.error.delete, { tripName: trip.name }),
              severity: "error"
            })
          );
        }

        break;
      }
    }
  };

  const {
    handleContextMenuClosed: handleClose,
    handleContextMenuOpened,
    menuProps
  } = useContextMenu(handleMenuAction);

  const handleCardSelected = (selectedTrip: IAPITripCard) => {
    navigate(ERoute.Trip.replace(":id", selectedTrip.id.toString()));
  };

  return (
    <>
      <BasicTripCard
        trip={trip}
        isLoading={isLoading}
        onCardSelected={handleCardSelected}
        onContextMenuOpened={handleContextMenuOpened}
        {...basicCardProps}
      />
      <ContextMenu {...menuProps} handleClose={handleClose} />
    </>
  );
}
