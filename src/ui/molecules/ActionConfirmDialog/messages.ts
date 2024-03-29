import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "components.ActionConfirmDialog";

export default injectMessageIds(scope, {
  header: "Confirm Action",
  body: "Are you sure you want to continue?",
  confirm: "OK",
  cancel: "Cancel"
}) as any;
