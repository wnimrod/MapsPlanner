import { IAPIMarker } from "src/api/markers";

import { GoogleMap, Libraries, Marker, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100wh"
};
const center = {
  lat: 32.073582, // default latitude
  lng: 34.788052 // default longitude
};

export default function Map(markers: IAPIMarker[]) {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      onLoad={() => console.log("Maps loaded!")}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  );
}
