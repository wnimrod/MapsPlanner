import type { IAPIUser } from "src/api/types";
import { fetchCurrentUser } from "src/api/users";
import useSWR from "swr";

export type TCurrentUserLoggedIn = { isLoggedIn: true } & IAPIUser;
export type TCurrentUser = TCurrentUserLoggedIn | { isLoggedIn: false };

export default function useCurrentUser() {
  const {
    data: user,
    error,
    isLoading
  } = useSWR<TCurrentUser>("global/current-user", async () => {
    const user = await fetchCurrentUser();
    if (user) {
      return { ...user, isLoggedIn: true as const };
    } else {
      return { isLoggedIn: false as const };
    }
  });

  const isLoaded = !isLoading && !error && !!user;
  const isLoggedIn = isLoaded && user.isLoggedIn;

  return { user, error, isLoggedIn, isLoading, isLoaded };
}
