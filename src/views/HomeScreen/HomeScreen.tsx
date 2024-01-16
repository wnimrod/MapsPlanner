import { useMemo, useState } from "react";

import { ImageList, ImageListItem } from "@mui/material";

import AddTripModal from "src/components/AddTripModal/AddTripModal";
import AddTripCard from "src/components/TripCard/AddTripCard/AddTripCard";
import TripCard from "src/components/TripCard/TripCard/TripCard";
import { ACTION_DELETE } from "src/components/TripCard/TripCard/manifest";

import { TAPITripCard } from "src/api/trips";
import useSearchParam, { EGlobalSearchParams } from "src/hooks/useSearchParam";
import { useTrips } from "src/hooks/useTrips";
import { generateEntityMocks } from "src/utils/utils";

import style from "./HomeScreen.module.scss";

export default function HomeScreen() {
  const mocks = generateEntityMocks<TAPITripCard>(5);
  const { trips = mocks, isLoading } = useTrips();
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);

  const searchQuery = useSearchParam(EGlobalSearchParams.Search);

  const displayableTrips = useMemo(() => {
    if (isLoading) {
      return trips; // Returns the mocks
    } else if (searchQuery) {
      return trips.filter((trip) => trip.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      return trips;
    }
  }, [trips, isLoading, searchQuery]);

  return (
    <>
      <ImageList rowHeight={375} className={style.list}>
        <ImageListItem key="trip-add">
          <AddTripCard isLoading={isLoading} onCardSelected={() => setIsAddTripModalOpen(true)} />
        </ImageListItem>
        {displayableTrips.map((trip: TAPITripCard) => (
          <ImageListItem key={`trip-card-${trip.id}`}>
            <TripCard isLoading={isLoading} trip={trip} actions={[ACTION_DELETE]} />
          </ImageListItem>
        ))}
      </ImageList>
      <AddTripModal isOpen={isAddTripModalOpen} onClose={() => setIsAddTripModalOpen(false)} />
    </>
  );
}
