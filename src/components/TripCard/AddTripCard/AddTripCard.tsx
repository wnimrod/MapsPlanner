import { IAPITripCard } from "src/api/trips";
import useCurrentUser, { TCurrentUserLoggedIn } from "src/hooks/useCurrentUser";

import BasicTripCard, { TBasicTripCardProps } from "../BasicTripCard/BasicTripCard";

type TProps = Omit<TBasicTripCardProps, "trip" | "onContextMenuOpened">;

export default function AddTripCard({ isLoading, onCardSelected }: TProps) {
  const { user } = useCurrentUser();

  const addTrip: IAPITripCard = {
    id: -1,
    creationDate: "",
    description: "Add your new trip, now!",
    userId: (user as TCurrentUserLoggedIn).id,
    name: "Add Trip!",
    picture: "/maps-background-light.jpg"
  };

  return <BasicTripCard trip={addTrip} isLoading={isLoading} onCardSelected={onCardSelected} />;
}
