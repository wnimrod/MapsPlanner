import { searchTrip } from "src/api/trips/trips";
import { TAPITripCard, TAPIUser } from "src/api/types";
import { searchUser } from "src/api/users/users";
import { ERoute } from "src/routes";

import { ESearchScope } from "./types";

export const SCOPE_SEARCHERS: [
  ESearchScope,
  (search: string) => Promise<TAPITripCard[] | TAPIUser[]>
][] = [
  [ESearchScope.Trips, searchTrip],
  [ESearchScope.Users, searchUser]
];

export const SCOPE_TO_PATH_MAPPER: Partial<Record<ESearchScope, ERoute>> = {
  [ESearchScope.Trips]: ERoute.Trip,
  [ESearchScope.Users]: ERoute.UserProfile
};
