import { injectMessageIds } from "src/utils/utils";

import { ETab } from "../types";

const scope = "viewsProfilePage.SettingsCard";

export default injectMessageIds(scope, {
  tabs: {
    [ETab.Profile]: "Profile",
    [ETab.Trips]: "Trips",
    [ETab.Activity]: "Activity",
    [ETab.Settings]: "Settings"
  }
}) as any;
