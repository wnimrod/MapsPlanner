import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "components.MainBar.Search";

export default injectMessageIds(scope, {
  noResults: "No Results Found"
}) as any;
