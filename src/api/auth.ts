import api, { unwrapAxiosResult } from "./axios";

const API_PREFIX = "/auth";

type TAuthProvider = "google";

type TAuthResponse = {
  url: string;
};

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
