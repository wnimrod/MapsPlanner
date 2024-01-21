import { injectMessageIds } from "src/utils/injectMessageIds";

import { EUserMenuEntry } from "./types";

const scope = "components.UserProfile";

export default injectMessageIds(scope, {
  labels: {
    [EUserMenuEntry.Profile]: "Profile",
    [EUserMenuEntry.Logout]: "Logout",
    adminMode: "Administrator Mode. Use With Cation."
  },
  errors: {
    logout: "Failed to logout. Please try again."
  }
}) as any;
