import { injectMessageIds } from "src/utils/injectMessageIds";

import { ESearchScope } from "../types";

const scope = "components.MainBar.Search.SearchGroup";

export default injectMessageIds(scope, {
  [ESearchScope.Audit]: "Audit",
  [ESearchScope.Markers]: "Markers",
  [ESearchScope.Trips]: "Trips",
  [ESearchScope.Users]: "Users"
}) as any;
