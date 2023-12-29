import { injectMessageIds } from "src/utils/utils";

const scope = "components.MainBar";

export default injectMessageIds(scope, {
  search: "Search this page ..."
}) as any;
