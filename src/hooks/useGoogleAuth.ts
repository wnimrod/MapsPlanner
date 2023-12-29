import { useSnackbar } from "notistack";
import api from "src/api/axios";

import { useIntl } from "react-intl";

import messages from "./messages";

type TAuthResponse = {
  url: string;
};

export default function useGoogleAuth() {
  const { formatMessage } = useIntl();

  const { enqueueSnackbar } = useSnackbar();
  const redirect = async () => {
    try {
      const response = await api.get<TAuthResponse>("/auth/google");
      window.location.href = response.data.url;
    } catch (error) {
      enqueueSnackbar(formatMessage(messages.useGoogleAuth.initiationFailure), {
        variant: "error"
      });
    }
  };

  return { redirect };
}
