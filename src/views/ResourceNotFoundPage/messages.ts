import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "views.ResourceNotFoundPage";

export default injectMessageIds(scope, {
  header: "{resourceType} Not Found.",
  subtitle: "We could not find this {resourceType}, everywhere we searched.",
  errors: {
    show: "Show errors",
    hide: "Hide errors"
  }
}) as any;
