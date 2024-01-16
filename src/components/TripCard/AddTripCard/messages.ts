import { EMarkerCategory } from "src/api/markers";
import { injectMessageIds } from "src/utils/utils";

const scope = "components.TripCard.AddTripCard";

export default injectMessageIds(scope, {
  name: "Add Trip",
  description: "Add your new trip, now!"
});
