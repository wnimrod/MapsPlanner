import { ImageList, ImageListItem } from "@mui/material";
import { IAPITripCard } from "src/api/trips";
import TripCard from "src/components/TripCard/TripCard";
import { useTrips } from "src/hooks/useTrips";
import { generateEntityMocks } from "src/utils/utils";

import style from "./HomeScreen.module.scss";

export default function HomeScreen() {
  const mocks = generateEntityMocks<IAPITripCard>(15);
  const { trips = mocks, isLoading } = useTrips();

  return (
    <ImageList rowHeight={375} className={style.list}>
      {trips!.map((trip: IAPITripCard) => (
        <ImageListItem key={`trip-card-${trip.id}`}>
          <TripCard isLoading={isLoading} trip={trip} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
