import { EMarkerCategory } from "src/api/markers";
import { injectMessageIds } from "src/utils/utils";

const scope = "components.Map";

export default injectMessageIds(scope, {
  labels: {
    categories: {
      [EMarkerCategory.nature]: "Nature",
      [EMarkerCategory.shopping]: "Shopping"
    },
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
  }
}) as any;
