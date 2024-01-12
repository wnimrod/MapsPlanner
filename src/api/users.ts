import Axios from "axios";

import api, { unwrapAxiosResult } from "./axios";

export type TAPIUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string; // as url
  isActive: boolean;
  isAdministrator: boolean;
};

export type TAPIUserProfile = {
  registerDate: Date;
  fullname: string;
  totalTrips: number;
  totalMarkers: number;
  gender: "M" | "F";
  birthDate: Date;
} & TAPIUser;

export type TAPIUpdateUserRequest = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  birthDate: Date;
  gender: "M" | "F";
}>;

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
