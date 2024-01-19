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

export type TCoordinates = {
  lat: number;
  lng: number;
};

export type TMapProviderProps = {
  markers: TAPIMarker[];
  center: TCoordinates;
  zoom: number;
  onContextMenu: (event: MouseEvent, coords: TCoordinates) => void;
  onMarkerSelected: (event: MouseEvent, marker: TAPIMarker) => void;
};
