import { TAPIMarkerCreationRequest } from "src/api/markers";
import * as markersAPI from "src/api/markers";
import { TAPITripDetails, fetchTrip } from "src/api/trips";
import useSWR from "swr";

export default function useTrip(tripId?: number) {
  const fetchKey = typeof tripId !== "undefined" ? `trip-${tripId}` : null;
  const {
    data: trip,
    isLoading,
    error,
    mutate
  } = useSWR<TAPITripDetails>(fetchKey, () => fetchTrip(tripId!));

  const addMarker = async (markerCreationRequest: TAPIMarkerCreationRequest) => {
    if (markerCreationRequest.tripId !== tripId) {
      throw new Error("Mismatch between marker.trip_id and trip.id");
    }

    const [newMarker] = await markersAPI.addMarkers([markerCreationRequest]);

    if (trip) {
      await mutate({ ...trip, markers: [...trip.markers, newMarker] });
    }

    return newMarker;
  };

  const generateMarkers = async (
    markerGenerationRequest: markersAPI.TAPIMarkerGenerationRequest
  ) => {
    if (markerGenerationRequest.tripId !== tripId) {
      throw new Error("Mismatch between marker.trip_id and trip.id");
    }

    const suggestedMarkers = await markersAPI.generateMarkers(markerGenerationRequest);

    if (trip) {
      await mutate({ ...trip, markers: [...trip.markers, ...suggestedMarkers] });
    }

    return suggestedMarkers;
  };
  return { trip, isLoading, addMarker, generateMarkers, error, mutate };
}
