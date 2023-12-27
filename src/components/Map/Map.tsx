import { PopoverPosition } from "@mui/material";
import { IAPIMarker } from "src/api/markers";
import useGeolocation from "src/hooks/useGeolocation";
import { delay } from "src/utils/utils";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

import InformationPopover from "./InformationPopover";

type TProps = {
  markers: IAPIMarker[];
  center?: IAPIMarker;
  zoom?: number;
};

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

type TMarkerInfo = {
  marker: IAPIMarker;
  position: PopoverPosition;
};

export default function Map({ markers, center: explicitCenter, zoom = 15 }: TProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { location } = useGeolocation();

  const [markerInfo, setMarkerInfo] = useState<TMarkerInfo | null>(null);

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

  const handleMarkerSelected = (event: google.maps.MapMouseEvent, marker: IAPIMarker) => {
    const { domEvent } = event;

    setMarkerInfo({
      marker,
      position: {
        top: (domEvent as MouseEvent).clientY,
        left: (domEvent as MouseEvent).clientX
      }
    });
  };

  function handleInformationPopoverClosed() {
    setMarkerInfo(null);
  }

  return (
    <>
      <GoogleMap
        id="google-map"
        mapContainerStyle={mapContainerStyle}
        zoom={explicitCenter ? 17 : zoom}
        center={center}
        onLoad={handleMapLoadded}
        options={{
          disableDoubleClickZoom: true,
          clickableIcons: false
        }}
      >
        {isMapLoaded &&
          markers.map((marker: IAPIMarker) => {
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
          onClose={handleInformationPopoverClosed}
        />
      )}
    </>
  );
}
