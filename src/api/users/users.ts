import Axios from "axios";

import api, { unwrapAxiosResult } from "../axios";
import { TAPIUpdateUserRequest, TAPIUser, TAPIUserProfile } from "./types";

const API_PREFIX = "/users";

export const fetchCurrentUser = async () => {
  try {
    const { data: user } = await api.get<TAPIUser>(`${API_PREFIX}/current`);
    return user;
  } catch (error) {
    if (Axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const fetchUserProfile = async (userId: number) => {
  const { data: user } = await api.get<TAPIUserProfile>(`${API_PREFIX}/${userId}/`);
  return user;
};

export const updateUser = async (userId: number, data: TAPIUpdateUserRequest) => {
  const result = await api.patch<TAPIUserProfile>(`${API_PREFIX}/${userId}`, data);
  return unwrapAxiosResult(result);
};

export const searchUser = async (search: string) => {
  const result = await api.get<TAPIUser[]>(`${API_PREFIX}/`, { params: { search } });
  return unwrapAxiosResult(result);
};
