import { useMemo } from "react";
import { useParams } from "react-router-dom";

import useCurrentUser from "src/hooks/useCurrentUser";

export default function useEffectiveUserId() {
  const { id: userId } = useParams();
  const { user: currentUser } = useCurrentUser();

  return useMemo(() => {
    if (userId !== undefined) {
      return +userId;
    } else if (currentUser?.isLoggedIn) {
      return currentUser.id;
    } else {
      return undefined;
    }
  }, [userId, currentUser]);
}
