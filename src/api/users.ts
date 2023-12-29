import Axios from "axios";

import api from "./axios";

export interface IAPIUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string; // as url
  isActive: boolean;
  isAdministrator: boolean;
}

export const fetchCurrentUser = async () => {
  try {
    const { data: user } = await api.get<IAPIUser>("/users/current");
    return user;
  } catch (error) {
    if (Axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
