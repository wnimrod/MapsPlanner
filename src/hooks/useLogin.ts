import { useGoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import axios from "../api/axios";
import { setAlert } from "../store/global";

type TGoogleUserInfo = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  locale: "en";
  name: string;
  picture: string; // as URL
  verifiedEmail: boolean;
};

export default function useLogin() {
  const loginCallback = useRef<any>();

  const dispatch = useDispatch();

  const handleLoginError = () =>
    dispatch(setAlert({ message: "Failed to log in", severity: "error" }));

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const { data: userInfoResponse } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo`,
          {
            params: { access_token },
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json"
            }
          }
        );

        loginCallback.current(userInfoResponse);
      } catch (error) {
        handleLoginError();
      }
    },
    onError: (error) => handleLoginError()
  });

  return {
    login: () =>
      new Promise((resolve) => {
        loginCallback.current = resolve;
        googleLogin();
      })
  };
}
