import { injectMessageIds } from "src/utils/utils";

const scope = "components.TripCard.AddTripCard";

export default injectMessageIds(scope, {
  categories: {
    [EMarkerCategory.nature]: {
      label: "Nature"
    },
    [EMarkerCategory.shopping]: {
      label: "Shopping"
    }
  }
});
