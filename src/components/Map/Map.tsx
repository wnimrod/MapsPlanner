import { GoogleMap, Marker } from "@react-google-maps/api";
import { Position } from "google-map-react";
import { useMemo, useState } from "react";

import { PopoverPosition } from "@mui/material";

import { TAPIMarker } from "src/api/markers";
import { TAPITripDetails } from "src/api/trips";
import useGeolocation from "src/hooks/useGeolocation";
import { delay } from "src/utils/utils";

import AddMarkerPopover from "./AddMarkerPopover/AddMarkerPopover";
import InformationPopover from "./InformationPopover/InformationPopover";
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

export default function Map({ trip, center: explicitCenter, zoom = 15 }: TProps) {
  const { markers } = trip;

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { location } = useGeolocation();

  const [markerInfo, setMarkerInfo] = useState<TMarkerInfo | null>(null);
  const [creationPopup, setCreationPopup] = useState<TCreationPopup | null>(null);

  const center = useMemo(() => {
    if (explicitCenter) {
      return { lat: explicitCenter.latitude, lng: explicitCenter.longitude };
    } else if (markers.length > 0) {
      return { lat: markers[0].latitude, lng: markers[0].longitude };
    } else if (location) {
      return { lat: location.latitude, lng: location.longitude };
    }
  }, [location, markers, explicitCenter]);

  const handleMapLoadded = () => {
    // Not clear why. but `delay(0)` is required in order to show the markers
    delay(0).then(() => setIsMapLoaded(true));
  };

  const handleMarkerSelected = (event: google.maps.MapMouseEvent, marker: TAPIMarker) => {
    const { domEvent } = event;
    setMarkerInfo({
      marker,
      position: {
        top: (domEvent as MouseEvent).clientY,
        left: (domEvent as MouseEvent).clientX
      }
    });
  };

  const handleRightClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng!.lat();
    const lng = event.latLng!.lng();

    const top = (event.domEvent as MouseEvent).clientY;
    const left = (event.domEvent as MouseEvent).clientX;

    setCreationPopup({
      position: { top, left },
      coords: { lat, lng }
    });
  };

  return (
    <>
      <GoogleMap
        id="google-map"
        mapContainerClassName={style.mapContainer}
        zoom={explicitCenter ? 17 : zoom}
        center={center}
        onLoad={handleMapLoadded}
        onRightClick={handleRightClick}
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
                onClick={(event: google.maps.MapMouseEvent) => handleMarkerSelected(event, marker)}
              />
            );
          })}
      </GoogleMap>
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
