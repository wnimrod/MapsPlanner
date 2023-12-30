import { injectMessageIds } from "src/utils/utils";

import { ETripCardActions } from "../TripCard/types";

const scope = "components.TripCard.ActionMenu";

export default injectMessageIds(scope, {
  [ETripCardActions.Delete]: "Delete",
  [ETripCardActions.Edit]: "Edit",
  [ETripCardActions.GenerateMarkers]: "Generate Markers"
}) as any;
