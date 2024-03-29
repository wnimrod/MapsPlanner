import { EMarkerCategory } from "src/api/types";
import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "components.Map";

export default injectMessageIds(scope, {
  labels: {
    categories: {
      [EMarkerCategory.nature]: "Nature",
      [EMarkerCategory.shopping]: "Shopping",
      [EMarkerCategory.Beach]: "Sea & Beach",
      [EMarkerCategory.Parks]: "City Parks",
      [EMarkerCategory.PublicTransportation]: "Transportation",
      [EMarkerCategory.Restaurant]: "Resturants"
    },
    header: "Add A Marker",
    category: "Category",
    description: "Description",
    title: "Title"
  },
  actions: {
    save: "Save"
  },
  validation: {
    title: {
      min: "Common, this one really short ...",
      required: "Please put it a name."
    }
  },
  errors: {
    failedToAddMarker: "Failed to add marker."
  }
}) as any;
