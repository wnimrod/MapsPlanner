import { IAPIMarker } from "src/api/markers";
import useGeolocation from "src/hooks/useGeolocation";
import { delay } from "src/utils/utils";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";

type TProps = {
  markers: IAPIMarker[];
  center?: IAPIMarker;
  zoom?: number;
};

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};

export default function Map({ markers, center: explicitCenter, zoom = 15 }: TProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { location } = useGeolocation();

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

  return (
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
      onDblClick={(event) => {
        console.log(event.latLng?.toJSON());
        event.stop();
        event.domEvent.stopPropagation();
        event.domEvent.preventDefault();
      }}
    >
      {isMapLoaded &&
        markers.map(({ id, title, latitude: lat, longitude: lng }: IAPIMarker) => (
          <Marker key={id} title={title} position={{ lat, lng }} />
        ))}
    </GoogleMap>
  );
}
