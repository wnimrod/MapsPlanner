import Axios from "axios";

import api from "./axios";

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
} & TAPIUser;

export const fetchCurrentUser = async () => {
  try {
    const { data: user } = await api.get<TAPIUser>("/users/current");
    return user;
  } catch (error) {
    if (Axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const fetchUserProfile = async (userId: number) => {
  const { data: user } = await api.get<TAPIUserProfile>(`/users/${userId}/`);
  return user;
};
