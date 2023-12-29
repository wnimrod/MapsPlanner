import { injectMessageIds } from "src/utils/utils";

const scope = "components.Map.InformationPopover";

export default injectMessageIds(scope, {
  confirmDeleteMarkerDialog: {
    header: "Delete Marker?",
    body: "Are you sure you want to delete marker {markerName}? This is irreversable."
  }
}) as any;
