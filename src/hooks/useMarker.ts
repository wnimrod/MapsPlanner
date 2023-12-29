import * as markersAPI from "src/api/markers";
import { TAPIMarker, TTripUpdateableFields } from "src/api/markers";
import useSWR from "swr";

import useTrip from "./useTrip";

type TOptions = { marker: TAPIMarker; markerId?: never } | { markerId: number; marker?: never };

export default function useMarker({ marker: propsMarker, markerId: propsMarkerId }: TOptions) {
  const { data: fetchedMarker } = useSWR(propsMarkerId ? `marker-${propsMarkerId}` : null, () =>
    markersAPI.fetchMarker(propsMarkerId!)
  );

  const marker = propsMarker || fetchedMarker;
  const { trip, mutate: mutateTrip } = useTrip(marker?.tripId); // Related trip

  const editMarker = async (markerId: number, data: TTripUpdateableFields) => {
    if (!trip) return;

    const getUpdatedTrip = (markerUpdated: Partial<TAPIMarker>) => ({
      ...trip,
      markers: trip.markers.map((marker) =>
        marker.id === markerId ? { ...marker, ...markerUpdated } : marker
      )
    });

    await mutateTrip(markersAPI.editMarker(markerId, data).then(getUpdatedTrip), {
      optimisticData: getUpdatedTrip(data)
    });
  };

  const deleteMarker = async (markerId: number) => {
    if (!trip) return;

    const optimisticData = {
      ...trip,
      markers: trip.markers.filter((marker) => marker.id !== markerId)
    };

    await mutateTrip(
      markersAPI.deleteMarker(markerId).then(() => optimisticData),
      { optimisticData }
    );
  };

  return { marker, editMarker, deleteMarker };
}
