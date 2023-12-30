import api, { unwrapAxiosResult } from "./axios";

export enum EMarkerCategory {
  nature = 0,
  shopping = 1,
  Restaurant = 2,
  Parks = 3,
  Beach = 4,
  PublicTransportation = 5
}

export type TAPIMarker = {
  id: number;
  tripId: number;
  category: EMarkerCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type TAPIMarkerCreationRequest = {
  tripId: number;
  category: EMarkerCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type TAPIMarkerGenerationRequest = {
  tripId: number;
  categories: EMarkerCategory[];
};

export const ALL_MARKER_CATEGORIES = Object.values(EMarkerCategory).filter(
  Number.isInteger
) as EMarkerCategory[];

const API_PREFIX = "/markers";

export type TTripUpdateableFields = Partial<Pick<TAPIMarker, "title" | "description">>;

export async function fetchMarker(markerId: number) {
  const result = await api.get<TAPIMarker>(`${API_PREFIX}/${markerId}`);
  return unwrapAxiosResult(result);
}

export async function addMarkers(markers: TAPIMarkerCreationRequest[]) {
  const result = await api.post<TAPIMarker[]>(`${API_PREFIX}/`, markers);
  return unwrapAxiosResult(result);
}

export async function generateMarkers({ tripId, categories }: TAPIMarkerGenerationRequest) {
  const result = await api.post<TAPIMarker[]>(`${API_PREFIX}/${tripId}/generate-markers`, {
    tripId,
    categories
  });
  return unwrapAxiosResult(result);
}

export async function editMarker(markerId: number, data: TTripUpdateableFields) {
  const result = await api.patch<TAPIMarker>(`${API_PREFIX}/${markerId}`, data);
  return unwrapAxiosResult(result);
}

export function deleteMarker(markerId: number) {
  return api.delete(`${API_PREFIX}/${markerId}`);
}
