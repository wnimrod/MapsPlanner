import { ImageList, ImageListItem } from "@mui/material";
import { IAPITripCard } from "src/api/trips";
import AddTripModal from "src/components/AddTripModal/AddTripModal";
import AddTripCard from "src/components/TripCard/AddTripCard/AddTripCard";
import TripCard from "src/components/TripCard/TripCard/TripCard";
import { useTrips } from "src/hooks/useTrips";
import { generateEntityMocks } from "src/utils/utils";

import { useState } from "react";

import style from "./HomeScreen.module.scss";

export default function HomeScreen() {
  const mocks = generateEntityMocks<IAPITripCard>(5);
  const { trips = mocks, isLoading } = useTrips();
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);

  return (
    <>
      <ImageList rowHeight={375} className={style.list}>
        <ImageListItem key="trip-add">
          <AddTripCard isLoading={isLoading} onCardSelected={() => setIsAddTripModalOpen(true)} />
        </ImageListItem>
        {trips!.map((trip: IAPITripCard) => (
          <ImageListItem key={`trip-card-${trip.id}`}>
            <TripCard isLoading={isLoading} trip={trip} />
          </ImageListItem>
        ))}
      </ImageList>
      <AddTripModal isOpen={isAddTripModalOpen} onClose={() => setIsAddTripModalOpen(false)} />
    </>
  );
}
