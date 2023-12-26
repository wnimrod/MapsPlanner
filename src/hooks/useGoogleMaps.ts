import { Libraries, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

export default function useGoogleMaps() {
  return useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    libraries
  });
}
