import { TAPIUserProfile, fetchUserProfile } from "src/api/users";
import useSWR from "swr";

export default function useUserProfile(userId?: number) {
  const shouldFetch = typeof userId !== "undefined";

  const {
    data: userProfile,
    isLoading,
    error
  } = useSWR<TAPIUserProfile>(shouldFetch ? `user-profile-${userId}` : null, () =>
    fetchUserProfile(userId!)
  );

  return { userProfile, isLoading, error };
}
