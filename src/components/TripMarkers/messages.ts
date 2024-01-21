import { EMarkerCategory } from "src/api/types";
import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "components.TripMarkers";

export default injectMessageIds(scope, {
  categories: {
    [EMarkerCategory.nature]: {
      label: "Nature"
    },
    [EMarkerCategory.shopping]: {
      label: "Shopping"
    },
    [EMarkerCategory.Beach]: {
      label: "Sea & Beach"
    },
    [EMarkerCategory.Parks]: {
      label: "City Parks"
    },
    [EMarkerCategory.PublicTransportation]: {
      label: "Transportation"
    },
    [EMarkerCategory.Restaurant]: {
      label: "Resturants"
    }
  },
  generateMarkers: {
    label: "Generate Markers",
    error: "Failed to generate markers",
    success: "{count} markers generated successfully!"
  }
}) as any;
