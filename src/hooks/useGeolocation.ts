import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState<GeolocationPosition["coords"] | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => setLocation(position.coords),
      (error: GeolocationPositionError) => setError(error)
    );
  }, []);

  return { location, error, waiting: !location && !error };
}
