import { TAPIMarker, TBaseAPIFilter } from "src/api/types";

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

export type TAPITripFilters = TBaseAPIFilter &
  Partial<{
    creationDate: string;
    name: string;
  }>;
