export type TBaseAPIFilter = Partial<{
  page: number;
  impersonateUserId: "all" | number;
}>;

export type { TAPIMarker, TAPIMarkerCreationRequest } from "./markers";
export type { TAPITripCard, TAPITripDetails, TAPITripCreationRequest } from "./trips";
export type { TAPIUser, TAPIUserProfile, TAPIUpdateUserRequest } from "./users";
export type { EAuditAction, TAPIAuditCard } from "./audit";
