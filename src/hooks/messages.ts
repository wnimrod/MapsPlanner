import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "hooks";

export default injectMessageIds(scope, {
  useGoogleAuth: {
    initiationFailure: "Failed to initiate google login redirection."
  }
}) as any;
