import api, { unwrapAxiosResult } from "../axios";
import { TAuthProvider, TAuthResponse } from "./types";

const API_PREFIX = "/auth";

export const getAuthCallback = async (authProvider: TAuthProvider) => {
  const response = await api.get<TAuthResponse>(`${API_PREFIX}/${authProvider}`);
  const { url } = unwrapAxiosResult(response);
  return url;
};

type TLogoutResponse = {
  loggedOut: boolean;
};

export const logout = async () => {
  const response = await api.get<TLogoutResponse>(`${API_PREFIX}/logout`);
  return unwrapAxiosResult(response);
};
