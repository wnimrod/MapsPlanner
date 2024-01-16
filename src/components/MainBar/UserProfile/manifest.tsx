import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import type { TFilterableMenuManifest } from "src/hooks/useMenuManifest";
import { AdminToggle, ThemeToggle } from "src/ui/molecules";

import { EUserMenuEntry } from "./types";

export const userMenuEntries: TFilterableMenuManifest[] = [
  {
    key: EUserMenuEntry.Profile,
    icon: PersonIcon
  },
  {
    key: EUserMenuEntry.ToggleTheme,
    render: () => <ThemeToggle />,
    public: true
  },
  {
    key: EUserMenuEntry.ToggleAdministratorMode,
    render: () => <AdminToggle />,
    administratorOnly: true
  },
  {
    key: EUserMenuEntry.Logout,
    icon: LogoutIcon
  }
];
