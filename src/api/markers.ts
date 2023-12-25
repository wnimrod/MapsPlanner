export enum EMarkerCategory {
  nature = 0,
  shopping = 1
}

export interface IAPIMarker {
  id: number;
  category: EMarkerCategory;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}
