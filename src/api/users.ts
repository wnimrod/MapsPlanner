import Axios from "axios";

import api from "./axios";

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
