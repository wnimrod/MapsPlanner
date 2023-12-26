import { IAPITripCard } from "src/api/trips";
import * as tripsAPI from "src/api/trips";
import { TRootState } from "src/store/types";
import useSWR from "swr";

import { useSelector } from "react-redux";

import useCurrentUser, { TCurrentUserLoggedIn } from "./useCurrentUser";

export function useTrips() {
  const isAdministratorMode = useSelector((state: TRootState) => state.global.administratorMode);
  const { user } = useCurrentUser() as { user: TCurrentUserLoggedIn };

  const key = `trips-${isAdministratorMode ? "global" : `user-${user.id}`}`;

  const {
    data: trips,
    isLoading,
    error,
    mutate
  } = useSWR<IAPITripCard[]>(key, () => tripsAPI.fetchTrips(isAdministratorMode));

  const deleteTrip = async (tripId: number) => {
    await tripsAPI.deleteTrip(tripId);
    await mutate(trips?.filter(({ id }) => id !== tripId), {});
  };

  return { trips, deleteTrip, isLoading, error };
}
