import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "views.ErrorScreen";

export default injectMessageIds(scope, {
  header: "We have a problem.",
  subtitle:
    "The application could not start due to {errorCount, plural, one {critical error} other {{errorCount} critical errors}}. Please try to reload the page, or come back later.",
  errors: {
    show: "Show errors",
    hide: "Hide errors"
  }
}) as any;
