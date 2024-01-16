import type { SvgIconComponent } from "@mui/icons-material";

export enum EUserMenuEntry {
  Profile = "profile",
  ToggleTheme = "toggle-theme",
  ToggleAdministratorMode = "toggle-administrator-mode",
  Logout = "Logout"
}

export type TUserMenuEntry = {
  key: EUserMenuEntry;
  icon?: SvgIconComponent;
  render?: (key: EUserMenuEntry) => React.ReactNode;
  administratorOnly?: boolean;
  public?: boolean; // Is this link shown to un-authenticated user?
};
