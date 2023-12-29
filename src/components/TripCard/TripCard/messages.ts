import { injectMessageIds } from "src/utils/utils";

const scope = "components.TripCard";

export default injectMessageIds(scope, {
  confirmDeleteTripDialog: {
    header: "Delete Trip?",
    body: "Are you sure you want to delete trip {tripName}? This is irreversable."
  }
}) as any;
