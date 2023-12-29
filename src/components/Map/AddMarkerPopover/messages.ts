import { EMarkerCategory } from "src/api/markers";
import { injectMessageIds } from "src/utils/utils";

const scope = "components.Map";

export default injectMessageIds(scope, {
  labels: {
    categories: {
      [EMarkerCategory.nature]: "Nature",
      [EMarkerCategory.shopping]: "Shopping"
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
