import { generatePath, useNavigate } from "react-router-dom";

import { TAPITripCard } from "src/api/trips";
import { ERoute } from "src/routes";

import BasicTripCard, { TBasicTripCardProps } from "../BasicTripCard/BasicTripCard";

export default function TripCard(basicTripCardProps: TBasicTripCardProps) {
  const navigate = useNavigate();

  const handleCardSelected = (selectedTrip: TAPITripCard) => {
    const path = generatePath(ERoute.Trip, { id: selectedTrip.id.toString() });
    navigate(path);
  };

  return <BasicTripCard onCardSelected={handleCardSelected} {...basicTripCardProps} />;
}
