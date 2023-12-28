import { EMarkerCategory } from "src/api/markers";
import { injectMessageIds } from "src/utils/utils";

const scope = "components.TripMarkers";

export default injectMessageIds(scope, {
  categories: {
    [EMarkerCategory.nature]: {
      label: "Nature"
    },
    [EMarkerCategory.shopping]: {
      label: "Shopping"
    }
  }
}) as any;
