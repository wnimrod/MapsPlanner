export enum EUserMenuEntry {
  Profile = "profile",
  ToggleTheme = "toggle-theme",
  ToggleAdministratorMode = "toggle-administrator-mode"
}

export type TUserMenuEntry = {
  key: EUserMenuEntry;
  administratorOnly?: boolean;
  render?: (key: EUserMenuEntry) => React.ReactNode;
  icon?: React.ReactNode;
  public?: boolean; // Is this link shown to un-authenticated user?
};
