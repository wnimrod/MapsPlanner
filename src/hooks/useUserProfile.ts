import useSWR from "swr";

import { TAPIUpdateUserRequest, TAPIUserProfile } from "src/api/types";
import * as usersAPI from "src/api/users/users";

export default function useUserProfile(userId?: number) {
  const shouldFetch = typeof userId !== "undefined";

  const {
    data: userProfile,
    isLoading,
    error,
    mutate
  } = useSWR<TAPIUserProfile>(shouldFetch ? `user-profile-${userId}` : null, () =>
    usersAPI.fetchUserProfile(userId!)
  );

  const editProfile = async (payload: TAPIUpdateUserRequest) => {
    if (!shouldFetch) return;

    // Remove undefine fields from payload
    const payloadKeys = Object.keys(payload) as (keyof TAPIUpdateUserRequest)[];
    payloadKeys.forEach((key) => payload[key] === undefined && delete payload[key]);

    const optimisticData: TAPIUserProfile = Object.assign({}, userProfile, payload);

    await mutate(
      usersAPI.updateUser(userId, payload).then((updatedUser) => updatedUser),
      { optimisticData }
    );
  };
  return { userProfile, isLoading, editProfile, error };
}
