import { GoogleMap as Map, Marker } from "@react-google-maps/api";
import { useState } from "react";

import { TAPIMarker } from "src/api/markers";
import { delay } from "src/utils/utils";

import style from "../Map.module.scss";
import { TMapProviderProps } from "../types";

export default function GoogleMap({
  markers,
  center,
  zoom,
  onContextMenu,
  onMarkerSelected
}: TMapProviderProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoadded = () => {
    // Not clear why. but `delay(0)` is required in order to show the markers
    delay(0).then(() => setIsMapLoaded(true));
  };

  const handleMarkerSelected = (event: google.maps.MapMouseEvent, marker: TAPIMarker) => {
    const { domEvent } = event;
    return onMarkerSelected(domEvent as MouseEvent, marker);
  };

  const handleContextMenu = ({ domEvent, latLng }: google.maps.MapMouseEvent) => {
    const lat = latLng!.lat();
    const lng = latLng!.lng();

    return onContextMenu(domEvent as MouseEvent, { lat, lng });
  };

  return (
    <Map
      id="google-map"
      mapContainerClassName={style.mapContainer}
      zoom={zoom}
      center={center}
      onLoad={handleMapLoadded}
      onRightClick={handleContextMenu}
      options={{
        disableDoubleClickZoom: true,
        clickableIcons: true
      }}
    >
      {isMapLoaded &&
        markers.map((marker: TAPIMarker) => {
          const { id, title, latitude: lat, longitude: lng } = marker;
          return (
            <Marker
              key={id}
              title={title}
              position={{ lat, lng }}
              onClick={(event) => handleMarkerSelected(event, marker)}
            />
          );
        })}
    </Map>
  );
}
