import { EMarkerCategory } from "src/api/markers";
import { injectMessageIds } from "src/utils/utils";

import { defineMessages } from "react-intl";

const scope = "components.TripMarkers";

export default injectMessageIds(
  scope,
  defineMessages({
    categories: {
      [EMarkerCategory.nature]: {
        label: "Nature"
      },
      [EMarkerCategory.shopping]: {
        label: "Shopping"
      }
    }
  })
);
