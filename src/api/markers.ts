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

export interface IAPIMarkerCreationRequest {
  tripId: number;
  category: EMarkerCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export const ALL_MARKER_CATEGORIES = Object.values(EMarkerCategory).filter(
  Number.isInteger
) as EMarkerCategory[];

const API_PREFIX = "/markers";

export type TTripUpdateableFields = Partial<Pick<IAPIMarker, "title" | "description">>;

export async function fetchMarker(markerId: number) {
  const result = await api.get<IAPIMarker>(`${API_PREFIX}/${markerId}`);
  return unwrapAxiosResult(result);
}

export async function addMarkers(markers: IAPIMarkerCreationRequest[]) {
  const result = await api.post<IAPIMarker[]>(`${API_PREFIX}/`, markers);
  return unwrapAxiosResult(result);
}

export async function editMarker(markerId: number, data: TTripUpdateableFields) {
  const result = await api.patch<IAPIMarker>(`${API_PREFIX}/${markerId}`, data);
  return unwrapAxiosResult(result);
}

export function deleteMarker(markerId: number) {
  return api.delete(`${API_PREFIX}/${markerId}`);
}
