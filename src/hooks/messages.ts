import { injectMessageIds } from "src/utils/utils";

const scope = "hooks";

export default injectMessageIds(scope, {
  useGoogleAuth: {
    initiationFailure: "Failed to initiate google login redirection."
  }
}) as any;
