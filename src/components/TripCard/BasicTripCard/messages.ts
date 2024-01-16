import { MessageDescriptor } from "react-intl";

import { injectMessageIds } from "src/utils/utils";

import { ETripCardActions } from "../TripCard/types";

const scope = "components.TripCard";

const messages = injectMessageIds(scope, {
  confirmDeleteTripDialog: {
    header: "Delete Trip?",
    body: "Are you sure you want to delete trip {tripName}? This is irreversable."
  },
  actions: {
    [ETripCardActions.Delete]: {
      label: "Delete",
      success: "Trip `{tripName}` deleted successfully.",
      error: "Failed to delete trip `{tripName}`"
    },
    [ETripCardActions.Edit]: {
      label: "Edit"
    },
    [ETripCardActions.GenerateMarkers]: {
      label: "Generate Markers"
    }
  }
}) as any;

export default messages;
