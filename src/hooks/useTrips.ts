import { TAPITripCard } from "src/api/trips";
import * as tripsAPI from "src/api/trips";
import { TAPITripCreationRequest } from "src/api/trips";
import { TRootState } from "src/store/types";
import useSWR from "swr";

import { useSelector } from "react-redux";

import useCurrentUser, { TCurrentUserLoggedIn } from "./useCurrentUser";

type TOptions = { fetch?: boolean };

export function useTrips({ fetch = true }: TOptions = {}) {
  const isAdministratorMode = useSelector((state: TRootState) => state.global.administratorMode);
  const { user } = useCurrentUser() as { user: TCurrentUserLoggedIn };

  const key = fetch ? `trips-${isAdministratorMode ? "global" : `user-${user.id}`}` : null;

  const {
    data: trips,
    isLoading,
    error,
    mutate
  } = useSWR<TAPITripCard[]>(key, () => tripsAPI.fetchTrips());

  const createTrip = async (payload: TAPITripCreationRequest) => {
    const newTrip = await tripsAPI.createTrip(payload);
    if (trips) {
      await mutate([newTrip, ...trips]);
    }
  };
  const deleteTrip = async (tripId: number) => {
    await tripsAPI.deleteTrip(tripId);
    if (trips) {
      await mutate(trips.filter(({ id }) => id !== tripId));
    }
  };

  return { trips, deleteTrip, createTrip, isLoading, error };
}
