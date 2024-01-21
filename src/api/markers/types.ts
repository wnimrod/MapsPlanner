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

export type TTripUpdateableFields = Partial<Pick<TAPIMarker, "title" | "description">>;
