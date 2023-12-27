import { injectMessageIds } from "src/utils/utils";

import { defineMessages } from "react-intl";

const scope = "views.TripScreen";

export default injectMessageIds(
  scope,
  defineMessages({
    mapLoading: "Map Is Loading ..."
  })
);
