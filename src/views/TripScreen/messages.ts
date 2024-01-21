import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "views.TripScreen";

export default injectMessageIds(scope, {
  mapLoading: "Map Is Loading ..."
}) as any;
