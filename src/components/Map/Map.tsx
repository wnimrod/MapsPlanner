import { GoogleMap, Libraries, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";

const libraries: Libraries = ["places"];

const mapContainerStyle = {
  height: "100%"
};
const center = {
  lat: 32.073582, // default latitude
  lng: 34.788052 // default longitude
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap mapContainerClassName="" mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        <Marker key={"1"} position={center} title="Hello world" />
      </GoogleMap>
    </div>
  );
}
