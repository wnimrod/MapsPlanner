import { Box } from "@mui/material";

import TripCard from "src/components/TripCard/TripCard/TripCard";

import { useTrips } from "src/hooks/useTrips";
import useParams from "src/views/ProfilePage/useParams";

export default function Trips() {
  const { id: userId } = useParams();
  const { isLoading, trips } = useTrips({ filters: { impersonateUserId: userId } });

  return (
    <Box>{trips?.slice(0, 5).map((trip) => <TripCard isLoading={isLoading} trip={trip} />)}</Box>
  );
}
