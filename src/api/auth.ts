import { setAlert } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useDispatch } from "react-redux";

import api from "./axios";

type TAuthResponse = {
  url: string;
};

export const useGoogleAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  const redirect = async () => {
    try {
      const response = await api.get<TAuthResponse>("/auth/google");
      window.open(response.data.url);
    } catch (error) {
      dispatch(
        setAlert({
          message: "Failed to initiate google login redirection.",
          severity: "error"
        })
      );
    }
  };

  return { redirect };
};
