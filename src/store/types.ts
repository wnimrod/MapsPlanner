import { AlertProps } from "@mui/material";
import type { IAPIUser } from "src/api/types";

// TODO: Need to have conditional typing
export type TUserState = null | ({ isLoggedIn: boolean } & Partial<IAPIUser>);

export type TLanguage = "en";

export type TGlobalState = {
  isAppReady: boolean;
  alert: {
    isOpen: boolean;
    message: string;
    severity: AlertProps["severity"];
  };
  isSideMenuOpen: boolean;
  administratorMode: boolean;
  language: TLanguage;
};

export type TRootState = {
  user: TUserState;
  global: TGlobalState;
};
