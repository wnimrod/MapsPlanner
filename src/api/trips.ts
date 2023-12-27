import api, { unwrapAxiosResult } from "./axios";
import { IAPIMarker } from "./markers";

export interface IAPITripCard {
  id: number;
  name: string;
  description: string;
  picture: string;
  creationDate: TTimestamp;
  userId: number;
}

export interface IAPITripDetails extends IAPITripCard {
  markers: IAPIMarker[];
}

export async function fetchTrips() {
  /**
   * Fetch all trips for current user.
   * @param fetchAll - If user is administrator, this fetch all trips, not only his.
   */

  const result = await api.get<IAPITripCard[]>("/trips/");
  return unwrapAxiosResult(result);
}

export async function fetchTrip(tripId: number) {
  const result = await api.get<IAPITripDetails>(`/trips/${tripId}/`);
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
