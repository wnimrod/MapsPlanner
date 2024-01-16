import { useMemo } from "react";

import { TMenuItem } from "src/ui/molecules/Menu/MenuItem/types";

import useCurrentUser from "./useCurrentUser";

export type TFilterableMenuManifest = TMenuItem &
  Partial<{
    administratorOnly: boolean;
    public: boolean; // Is this link shown to un-authenticated user?
  }>;

export default function useMenuManifest(manifest: TFilterableMenuManifest[]) {
  const { user } = useCurrentUser();

  const filterSettingsEntry = (menuEntry: TFilterableMenuManifest) => {
    if (menuEntry.public) {
      return true;
    } else if (user?.isLoggedIn) {
      return menuEntry.administratorOnly ? user.isAdministrator : true;
    } else {
      return false;
    }
  };

  return useMemo(() => manifest.filter(filterSettingsEntry), [manifest]);
}
