import { lazy, useMemo } from "react";

import { EMapProvider } from "./types";

export default function useMapProvider(provider: EMapProvider) {
  return useMemo(() => {
    return lazy(async () => {
      const { GoogleMap, OpenStreetMap } = await import("src/components/Map");
      switch (provider) {
        case EMapProvider.GoogleMaps:
          return { default: GoogleMap };
        case EMapProvider.OpenStreetMap:
          return { default: OpenStreetMap };
      }
    });
  }, [provider]);
}
