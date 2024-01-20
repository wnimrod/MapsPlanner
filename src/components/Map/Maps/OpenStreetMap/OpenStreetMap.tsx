import { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { GeocodingControl } from "@maptiler/geocoding-control/leaflet";
import "@maptiler/geocoding-control/style.css";
import { LeafletEventHandlerFnMap, Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

import { TAPIMarker } from "src/api/markers";

import style from "../Map.module.scss";
import { TMapProviderProps } from "../types";

export default function Map({
  markers,
  center,
  zoom,
  onContextMenu,
  onMarkerSelected
}: TMapProviderProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    map.on("contextmenu", (event: LeafletMouseEvent) =>
      onContextMenu(event.originalEvent, event.latlng)
    );

    map.addControl(new GeocodingControl({ apiKey: import.meta.env.MAPTILER_API_KEY }));

    return () => {
      map.off("contextmenu");
    };
  }, [mapRef.current]);

  useEffect(() => {
    if (!center) return;
    mapRef.current?.flyTo(center, zoom);
  }, [center]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className={style.mapContainer}
        ref={(ref) => (mapRef.current = ref)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker: TAPIMarker) => {
          const { id, title, latitude, longitude } = marker;
          const eventHandlers: LeafletEventHandlerFnMap = {
            click: (event: LeafletMouseEvent) => onMarkerSelected(event.originalEvent, marker)
          };

          return (
            <Marker
              key={`marker-${id}`}
              position={[latitude, longitude]}
              eventHandlers={eventHandlers}
              title={title}
              riseOnHover
            />
          );
        })}
      </MapContainer>
    </>
  );
}
