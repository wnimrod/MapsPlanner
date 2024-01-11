import { ERoute } from "src/routes";
import { injectMessageIds } from "src/utils/utils";

const scope = "components.MainBar";

export default injectMessageIds(scope, {
  search: {
    default: "Search ...",
    [ERoute.UserProfile]: "Search Users ...",
    [ERoute.Trip]: "Search on this trip ..."
  }
}) as any;
