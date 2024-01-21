export type TBaseAPIFilter = Partial<{
  page: number;
  impersonateUserId: "all" | number;
}>;

export type {
  TAPIMarker,
  TAPIMarkerCreationRequest,
  TAPIMarkerGenerationRequest,
  TTripUpdateableFields
} from "./markers/types";

export { EMarkerCategory } from "./markers/types";

export type {
  TAPITripCard,
  TAPITripDetails,
  TAPITripCreationRequest,
  TAPITripFilters
} from "./trips/types";

export type { TAPIUser, TAPIUserProfile, TAPIUpdateUserRequest } from "./users/types";
export { EGender } from "./users/types";

export type { TAPIAuditCard, TAPIAuditFilter, TTargetModel } from "./audit/types";
export { EAuditAction } from "./audit/types";
