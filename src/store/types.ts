import { AlertProps } from "@mui/material";

// TODO: Need to have conditional typing
export type TUserState = null | ({ isLoggedIn: boolean } & Partial<IAPIUser>);

export type TGlobalState = {
  isAppReady: boolean;
  alert: {
    isOpen: boolean;
    message: string;
    severity: AlertProps["severity"];
  };
  isSideMenuOpen: boolean;
};

export type TRootState = {
  user: TUserState;
  global: TGlobalState;
};
