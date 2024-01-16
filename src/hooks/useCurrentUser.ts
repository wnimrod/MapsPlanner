import useSWR from "swr";

import type { TAPIUser } from "src/api/types";
import { fetchCurrentUser } from "src/api/users";

import { TBaseFetchOptions } from "./types";

export type TCurrentUserLoggedIn = { isLoggedIn: true } & TAPIUser;
export type TCurrentUser = TCurrentUserLoggedIn | { isLoggedIn: false };

export default function useCurrentUser({ shouldFetch = true }: TBaseFetchOptions = {}) {
  const fetchKey = shouldFetch ? "global/current-user" : null;

  const {
    data: user,
    error,
    isLoading
  } = useSWR<TCurrentUser>(fetchKey, async () => {
    const user = await fetchCurrentUser();
    return user ? { ...user, isLoggedIn: true as const } : { isLoggedIn: false as const };
  });

  const isLoaded = !isLoading && !error && !!user;
  const isLoggedIn = isLoaded && user.isLoggedIn;

  return {
    user,
    error,
    isLoggedIn,
    isLoading,
    isLoaded,
    isAdministrator: (user?.isLoggedIn && user.isAdministrator) || false
  };
}
