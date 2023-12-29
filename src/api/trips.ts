import { delay } from "src/utils/utils";

import api, { unwrapAxiosResult } from "./axios";
import { TAPIMarker } from "./markers";

export type TAPITripCard = {
  id: number;
  name: string;
  description: string;
  picture: string;
  creationDate: string;
  userId: number;
};

export type TAPITripCreationRequest = {
  name: string;
  description?: string;
  picture: string; // As url or base64
};

export type TAPITripDetails = {
  markers: TAPIMarker[];
} & TAPITripCard;

const API_PREFIX = "/trips";

export async function fetchTrips() {
  /**
   * Fetch all trips for current user.
   * @param fetchAll - If user is administrator, this fetch all trips, not only his.
   */

  await delay(3000);
  const result = await api.get<TAPITripCard[]>(`${API_PREFIX}/`);
  return unwrapAxiosResult(result);
}

export async function fetchTrip(tripId: number) {
  await delay(5000);
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
