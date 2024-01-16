import { useSelector } from "react-redux";

import useSWR from "swr";

import { TAPITripCard } from "src/api/trips";
import * as tripsAPI from "src/api/trips";
import { TAPITripCreationRequest } from "src/api/trips";
import { TRootState } from "src/store/types";

import type { TBaseFetchOptions } from "./types";

type TOptions = TBaseFetchOptions & {
  filters?: tripsAPI.TAPITripFilters;
};

export function useTrips({ shouldFetch = true, filters }: TOptions = {}) {
  const isAdministratorMode = useSelector((state: TRootState) => state.global.administratorMode);
  const key = shouldFetch ? ["trips", isAdministratorMode, filters] : null;

  const {
    data: trips,
    isLoading,
    error,
    mutate
  } = useSWR<TAPITripCard[]>(key, () => tripsAPI.fetchTrips(filters));

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
