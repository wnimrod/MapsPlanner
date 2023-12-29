import { TAPIMarkerCreationRequest } from "src/api/markers";
import * as markersAPI from "src/api/markers";
import { TAPITripDetails, fetchTrip } from "src/api/trips";
import useSWR from "swr";

export default function useTrip(tripId?: number) {
  const shouldFetch = typeof tripId !== "undefined";

  const {
    data: trip,
    isLoading,
    error,
    mutate
  } = useSWR<TAPITripDetails>(shouldFetch ? `trip-${tripId}` : null, () => fetchTrip(tripId!));

  const addMarker = async (markerCreationRequest: TAPIMarkerCreationRequest) => {
    if (markerCreationRequest.tripId !== tripId) {
      throw new Error("Mismatch between marker.trip_id and trip.id");
    }

    const [newMarker] = await markersAPI.addMarkers([markerCreationRequest]);

    if (trip) {
      await mutate({ ...trip, markers: [...trip.markers, newMarker] });
    }
  };

  return { trip, isLoading, addMarker, error, mutate };
}
