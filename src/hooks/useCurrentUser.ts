import { fetchCurrentUser } from "src/api/users";
import useSWR from "swr";

export default function useCurrentUser() {
  const { data: user, error, isLoading } = useSWR("global/current-user", fetchCurrentUser);

  return {
    user,
    error,
    isLoading
  };
}
