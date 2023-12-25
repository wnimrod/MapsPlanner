import { delay } from "src/utils/utils";

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

export function fetchTrips(fetchAll: boolean = false) {
  /**
   * Fetch all trips for current user.
   * @param fetchAll - If user is administrator, this fetch all trips, not only his.
   */

  return delay(5000)
    .then(() => api.get<IAPITripCard[]>("/trips/"))
    .then(unwrapAxiosResult);
}

export function deleteTrip(tripId: number) {
  /**
   * Deletes a trip.
   * @package tripId: The trip id.
   */
  return api.delete(`/trips/${tripId}/`).then(unwrapAxiosResult);
}
