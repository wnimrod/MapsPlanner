import { TAPITripCard } from "src/api/trips";
import { ERoute } from "src/routes";

import { useNavigate } from "react-router-dom";

import BasicTripCard, { TBasicTripCardProps } from "../BasicTripCard/BasicTripCard";
import { TMenuItem } from "./types";

type TProps = {
  actions?: TMenuItem[];
} & TBasicTripCardProps;

export default function TripCard({ trip, isLoading, ...basicCardProps }: TProps) {
  const navigate = useNavigate();

  const handleCardSelected = (selectedTrip: TAPITripCard) => {
    navigate(ERoute.Trip.replace(":id", selectedTrip.id.toString()));
  };

  return (
    <BasicTripCard
      trip={trip}
      isLoading={isLoading}
      onCardSelected={handleCardSelected}
      {...basicCardProps}
    />
  );
}
