import { ReactNode, useMemo, useState } from "react";
import { MessageDescriptor, useIntl } from "react-intl";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";

import cx from "classnames";
import { useSnackbar } from "notistack";

import type { TAPITripCard } from "src/api/trips";
import useContextMenu from "src/hooks/useContextMenu";
import useSkeleton from "src/hooks/useSkeleton";
import { useTrips } from "src/hooks/useTrips";
import { Menu } from "src/ui/molecules";
import { ConditionalWrap } from "src/utils/utils";

import { ETripCardActions, TMenuItem } from "../TripCard/types";
import style from "./BasicTripCard.module.scss";
import messages from "./messages";

export type TBasicTripCardProps = {
  trip?: TAPITripCard;
  isLoading: boolean;
  actions?: TMenuItem[];
  onCardSelected?: (trip: TAPITripCard) => void;
  classes?: Partial<{
    container: string;
  }>;
};

export default function BasicTripCard(props: TBasicTripCardProps) {
  const { trip, isLoading, actions, onCardSelected, classes = {} } = props;
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const withSkeleton = useSkeleton({ isLoading });

  const [menuButtonRef, setMenuButtonRef] = useState<HTMLButtonElement | null>(null);

  const { deleteTrip } = useTrips();

  const actionMessages = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(messages.actions as [string, any]).map(([key, { label }]) => [key, label])
      ) as Record<ETripCardActions, MessageDescriptor>,
    [messages]
  );

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
          enqueueSnackbar(
            formatMessage(messages[ETripCardActions.Delete].success, { tripName: trip.name }),
            { variant: "success" }
          );
        } catch (error) {
          enqueueSnackbar(
            formatMessage(messages[ETripCardActions.Delete].error, { tripName: trip.name }),
            { variant: "error" }
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
  } = useContextMenu({ anchor: menuButtonRef || undefined, handleActionTaken: handleMenuAction });

  const handleCardSelected = () => {
    if (onCardSelected && trip) {
      onCardSelected(trip);
    }
  };

  const makeInteractive = (children: ReactNode) => (
    <CardActionArea
      disableTouchRipple
      classes={{ root: style.actionArea }}
      disabled={!onCardSelected}
      onClick={handleCardSelected}
    >
      <div className={style.container}>{children}</div>
    </CardActionArea>
  );

  const handleMenuOpened = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    handleContextMenuOpened(event);
  };

  return (
    <>
      <Card className={cx(style.card, classes.container)}>
        <ConditionalWrap condition={!!onCardSelected} wrapper={makeInteractive}>
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
              <div className={style.header}>
                <span className={style.label}>{withSkeleton(trip?.name)}</span>
                {actions && (
                  <IconButton onClick={handleMenuOpened} ref={setMenuButtonRef}>
                    <MoreVertIcon />
                  </IconButton>
                )}
              </div>
            </Typography>
            <Typography variant="body2" color="text.secondary" className={style.description}>
              {withSkeleton(trip?.description, 4)}
            </Typography>
          </CardContent>
        </ConditionalWrap>
      </Card>
      {actions && (
        <Menu
          items={actions}
          onItemSelected={(item) => handleClose(item.key)}
          messages={actionMessages}
          {...menuProps}
        />
      )}
    </>
  );
}
