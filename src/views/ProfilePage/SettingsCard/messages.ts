import { injectMessageIds } from "src/utils/utils";

const scope = "viewsProfilePage.SettingsCard";

export default injectMessageIds(scope, {
  tabs: {
    profile: "Profile",
    trips: "Trips",
    settings: "Settings"
  }
}) as any;
