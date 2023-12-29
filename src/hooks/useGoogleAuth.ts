import api from "src/api/axios";
import { setAlert } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

import messages from "./messages";

type TAuthResponse = {
  url: string;
};

export default function useGoogleAuth() {
  const { formatMessage } = useIntl();
  const dispatch: AppDispatch = useDispatch();

  const redirect = async () => {
    try {
      const response = await api.get<TAuthResponse>("/auth/google");
      window.location.href = response.data.url;
    } catch (error) {
      dispatch(
        setAlert({
          message: formatMessage(messages.useGoogleAuth.initiationFailure),
          severity: "error"
        })
      );
    }
  };

  return { redirect };
}
