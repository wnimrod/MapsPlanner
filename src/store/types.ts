import { AlertProps } from "@mui/material";

import type { TAPIUser } from "src/api/types";

// TODO: Need to have conditional typing
export type TUserState = null | ({ isLoggedIn: boolean } & Partial<TAPIUser>);

export type TLanguage = "en";

export type TGlobalState = {
  isAppReady: boolean;
  alert: {
    isOpen: boolean;
    message: string;
    severity: AlertProps["severity"];
  };
  administratorMode: boolean;
  language: TLanguage;
};

export type TRootState = {
  user: TUserState;
  global: TGlobalState;
};
