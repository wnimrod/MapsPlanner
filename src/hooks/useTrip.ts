import { IAPIMarker, TTripUpdateableFields, updateMarker } from "src/api/markers";
import { IAPITripDetails, fetchTrip } from "src/api/trips";
import useSWR from "swr";

export default function useTrip(tripId?: number) {
  const shouldFetch = typeof tripId !== "undefined";

  const {
    data: trip,
    isLoading,
    error,
    mutate
  } = useSWR<IAPITripDetails>(shouldFetch ? `trip-${tripId}` : null, () => fetchTrip(tripId!));

  return { trip, isLoading, error, mutate };
}
