import PersonIcon from "@mui/icons-material/Person";

import ThemeSwtich from "../ThemeSwitch/ThemeSwitch";
import ToggleAdminMode from "../ToggleAdminMode/ToggleAdminMode";
import { EUserMenuEntry, TUserMenuEntry } from "./types";

export const userMenuEntries: TUserMenuEntry[] = [
  {
    key: EUserMenuEntry.Profile,
    administratorOnly: true,
    icon: <PersonIcon />
  },
  {
    key: EUserMenuEntry.ToggleTheme,
    administratorOnly: false,
    render: () => <ThemeSwtich />
  },
  {
    key: EUserMenuEntry.ToggleAdministratorMode,
    administratorOnly: true,
    render: () => <ToggleAdminMode />
  }
];
