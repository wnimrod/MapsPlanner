import type { TAPIMarker } from "src/api/markers";
import type { TAPITripDetails } from "src/api/trips";

export enum EMapProvider {
  GoogleMaps,
  OpenStreetMap
}

export type TMapProps = {
  trip: TAPITripDetails;
  center?: TAPIMarker;
  zoom?: number;
};
