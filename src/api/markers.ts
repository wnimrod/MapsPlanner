import api, { unwrapAxiosResult } from "./axios";

export enum EMarkerCategory {
  nature = 0,
  shopping = 1
}

export interface IAPIMarker {
  id: number;
  tripId: number;
  category: EMarkerCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

const API_PREFIX = "/markers";

export type TTripUpdateableFields = Partial<Pick<IAPIMarker, "title" | "description">>;

export function fetchMarker(markerId: number) {
  return api.get<IAPIMarker>(`${API_PREFIX}/${markerId}`).then(unwrapAxiosResult);
}

export function editMarker(markerId: number, data: TTripUpdateableFields) {
  return api.patch<IAPIMarker>(`${API_PREFIX}/${markerId}`, data).then(unwrapAxiosResult);
}

export function deleteMarker(markerId: number) {
  return api.delete(`${API_PREFIX}/${markerId}`);
}
