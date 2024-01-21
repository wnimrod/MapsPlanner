import { Suspense, useCallback, useMemo, useState } from "react";

import { PopoverPosition } from "@mui/material";

import { TAPIMarker } from "src/api/types";
import useGeolocation from "src/hooks/useGeolocation";

import AddMarkerPopover from "./AddMarkerPopover/AddMarkerPopover";
import InformationPopover from "./InformationPopover/InformationPopover";
import { EMapProvider, TCoordinates, type TMapProps } from "./Maps/types";
import useMapProvider from "./Maps/useMapProvider";

type TProps = TMapProps & {
  provider: EMapProvider;
};

type TMarkerInfo = {
  marker: TAPIMarker;
  position: PopoverPosition;
};

type TCreationPopup = {
  position: PopoverPosition;
  coords: TCoordinates;
};

export default function Map(props: TProps) {
  const { provider, trip, center: explicitCenter, zoom: initialZoom = 15 } = props;
  const { markers } = trip;

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
    } else {
      return { lat: 0, lng: 0 };
    }
  }, [location, markers, explicitCenter]);

  const MapProvider = useMapProvider(provider);

  const handleContextMenu = useCallback((event: MouseEvent, coords: TCoordinates) => {
    const { clientY: top, clientX: left } = event;
    setCreationPopup({
      position: { top, left },
      coords
    });
  }, []);

  const handleMarkerSelected = useCallback((event: MouseEvent, marker: TAPIMarker) => {
    const { clientY: top, clientX: left } = event;
    setMarkerInfo({
      marker,
      position: { top, left }
    });
  }, []);

  const zoom = explicitCenter ? 17 : initialZoom;

  return (
    <>
      <Suspense>
        <MapProvider
          markers={markers}
          center={center}
          zoom={zoom}
          onContextMenu={handleContextMenu}
          onMarkerSelected={handleMarkerSelected}
        />
      </Suspense>
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
