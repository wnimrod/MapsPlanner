import { injectMessageIds } from "src/utils/utils";

import { EUserMenuEntry } from "./types";

const scope = "components.UserProfile";

export default injectMessageIds(scope, {
  labels: {
    [EUserMenuEntry.Profile]: "Profile"
  }
}) as any;
