import { useIntl } from "react-intl";

import { TAPITripCard } from "src/api/types";
import useCurrentUser, { TCurrentUserLoggedIn } from "src/hooks/useCurrentUser";

import BasicTripCard, { TBasicTripCardProps } from "../BasicTripCard/BasicTripCard";
import messages from "./messages";

type TProps = Omit<TBasicTripCardProps, "trip" | "onContextMenuOpened">;

export default function AddTripCard({ isLoading, onCardSelected }: TProps) {
  const { user } = useCurrentUser();
  const { formatMessage } = useIntl();

  const addTrip: TAPITripCard = {
    id: -1,
    creationDate: "",
    name: formatMessage(messages.name),
    description: formatMessage(messages.description),
    userId: (user as TCurrentUserLoggedIn).id,
    picture: "/maps-background-light.jpg"
  };

  return <BasicTripCard trip={addTrip} isLoading={isLoading} onCardSelected={onCardSelected} />;
}
