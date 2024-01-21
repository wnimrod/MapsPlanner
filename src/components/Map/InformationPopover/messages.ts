import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "components.Map.InformationPopover";

export default injectMessageIds(scope, {
  confirmDeleteMarkerDialog: {
    header: "Delete Marker?",
    body: "Are you sure you want to delete marker {markerName}? This is irreversable."
  },
  errors: {
    editMarker: "Failed to edit marker.",
    deleteMarker: "Failed to delete marker {markerName}."
  }
}) as any;
