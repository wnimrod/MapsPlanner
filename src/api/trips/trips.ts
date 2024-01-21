import api, { unwrapAxiosResult } from "../axios";
import { TAPITripCard, TAPITripCreationRequest, TAPITripDetails, TAPITripFilters } from "./types";

const API_PREFIX = "/trips";

export async function fetchTrips(filters: TAPITripFilters = {}) {
  /**
   * Fetch all trips for current user.
   * @param fetchAll - If user is administrator, this fetch all trips, not only his.
   */

  const result = await api.get<TAPITripCard[]>(`${API_PREFIX}/`, {
    params: filters
  });

  return unwrapAxiosResult(result);
}

export async function fetchTrip(tripId: number) {
  const result = await api.get<TAPITripDetails>(`${API_PREFIX}/${tripId}/`);
  return unwrapAxiosResult(result);
}

export async function createTrip(payload: TAPITripCreationRequest) {
  const result = await api.post<TAPITripCard>(`${API_PREFIX}/`, payload);
  return unwrapAxiosResult(result);
}

export async function deleteTrip(tripId: number) {
  /**
   * Deletes a trip.
   * @package tripId: The trip id.
   */
  const result = await api.delete(`/trips/${tripId}/`);
  return unwrapAxiosResult(result);
}

export async function searchTrip(search: string) {
  const result = await api.get<TAPITripCard[]>(`${API_PREFIX}/`, { params: { search } });
  return unwrapAxiosResult(result);
}
