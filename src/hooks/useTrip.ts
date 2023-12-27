import { IAPITripDetails, fetchTrip } from "src/api/trips";
import { delay } from "src/utils/utils";
import useSWR from "swr";

type TOptions = {
  tripId: number;
};

export default function useTrip(tripId: number) {
  const {
    data: trip,
    isLoading,
    error
  } = useSWR<IAPITripDetails>(`trip-${tripId}`, () => fetchTrip(tripId));

  return { trip, isLoading, error };
}
