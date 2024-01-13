import { EAuditAction } from "src/api/audit";
import { injectMessageIds } from "src/utils/utils";

const scope = "viewsProfilePage.SettingsCard.Tabs.ActivityLog";

export default injectMessageIds(scope, {
  headers: {
    id: "ID",
    action: "Action",
    description: "Description",
    resource: "Resource"
  },
  description: {
    [EAuditAction.Creation]:
      "{model} #{id} was created at {creationDate, date, short} {creationDate, time, short}.",
    [EAuditAction.Modification]:
      "{model} #{id} was modified at {creationDate, date, short} {creationDate, time, short}.",
    [EAuditAction.Deletion]:
      "{model} #{id} was deleted at {creationDate, date, short} {creationDate, time, short}.",
    [EAuditAction.ChatGPTQuery]: "A ChatGPT prompt executed."
  }
}) as any;
