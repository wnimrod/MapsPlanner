import { Position } from "google-map-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { PopoverPosition } from "@mui/material";

import { LeafletEventHandlerFnMap, Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

import { TAPIMarker } from "src/api/markers";
import { TAPITripDetails } from "src/api/trips";
import useGeolocation from "src/hooks/useGeolocation";

import AddMarkerPopover from "../AddMarkerPopover/AddMarkerPopover";
import InformationPopover from "../InformationPopover/InformationPopover";
import style from "./Map.module.scss";

type TProps = {
  trip: TAPITripDetails;
  center?: TAPIMarker;
  zoom?: number;
};

type TMarkerInfo = {
  marker: TAPIMarker;
  position: PopoverPosition;
};

type TCreationPopup = {
  position: PopoverPosition;
  coords: Position;
};

export default function Map({ trip, center: explicitCenter, zoom: initialZoom = 15 }: TProps) {
  const { markers } = trip;

  const { location } = useGeolocation();

  const [markerInfo, setMarkerInfo] = useState<TMarkerInfo | null>(null);
  const [creationPopup, setCreationPopup] = useState<TCreationPopup | null>(null);

  const mapRef = useRef<LeafletMap | null>(null);

  const center = useMemo(() => {
    if (explicitCenter) {
      return { lat: explicitCenter.latitude, lng: explicitCenter.longitude };
    } else if (markers.length > 0) {
      return { lat: markers[0].latitude, lng: markers[0].longitude };
    } else if (location) {
      return { lat: location.latitude, lng: location.longitude };
    }
  }, [location, markers, explicitCenter]);

  const handleRightClick = useCallback(({ originalEvent, latlng }: LeafletMouseEvent) => {
    const { lat, lng } = latlng;
    const { clientY: top, clientX: left } = originalEvent;

    setCreationPopup({
      position: { top, left },
      coords: { lat, lng }
    });
  }, []);

  const handleMarkerSelected = useCallback((event: LeafletMouseEvent, marker: TAPIMarker) => {
    const {
      originalEvent: { clientY: top, clientX: left }
    } = event;

    setMarkerInfo({
      marker,
      position: { top, left }
    });
  }, []);

  const zoom = explicitCenter ? 17 : initialZoom;

  useEffect(() => {
    const map = mapRef.current;
    map?.on("contextmenu", handleRightClick);

    return () => {
      map?.off("contextmenu");
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
            click: (event: LeafletMouseEvent) => handleMarkerSelected(event, marker)
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
      {markerInfo && (
        <InformationPopover
          marker={markerInfo.marker}
          anchorPosition={markerInfo.position}
          onClose={() => setMarkerInfo(null)}
        />
      )}
      {creationPopup && (
        <AddMarkerPopover
          anchorPosition={creationPopup.position}
          trip={trip}
          latitude={creationPopup.coords.lat}
          longitude={creationPopup.coords.lng}
          onClose={() => setCreationPopup(null)}
        />
      )}
    </>
  );
}
