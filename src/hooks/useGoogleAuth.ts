import { useSnackbar } from "notistack";
import * as AuthAPI from "src/api/auth";

import { useIntl } from "react-intl";

import messages from "./messages";

export default function useGoogleAuth() {
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const redirect = async () => {
    try {
      window.location.href = await AuthAPI.getAuthCallback("google");
    } catch (error) {
      const message = formatMessage(messages.useGoogleAuth.initiationFailure);
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return { redirect };
}
