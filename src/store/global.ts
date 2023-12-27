import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TGlobalState } from "./types";

export const SLICE_NAME = "global";

const initialState: TGlobalState = {
  isAppReady: false,
  alert: {
    isOpen: false,
    message: "",
    severity: undefined
  },
  isSideMenuOpen: false,
  administratorMode: false,
  language: "en"
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsAppReady(state: TGlobalState, { payload: isAppReady }: PayloadAction<boolean>) {
      state.isAppReady = isAppReady;
    },
    setAlert(
      state: TGlobalState,
      { payload: alert }: PayloadAction<Omit<TGlobalState["alert"], "isOpen">>
    ) {
      state.alert = { isOpen: true, ...alert };
    },
    dismissAlert(state: TGlobalState) {
      state.alert = initialState.alert;
    },
    setIsSideMenuOpen: (state: TGlobalState, { payload: isOpen }: PayloadAction<boolean>) => {
      state.isSideMenuOpen = isOpen;
    },
    setAdministratorMode: (
      state: TGlobalState,
      { payload: isAdministratorMode }: PayloadAction<boolean>
    ) => {
      state.administratorMode = isAdministratorMode;
    }
  }
});

export const { setIsAppReady, setAlert, dismissAlert, setIsSideMenuOpen, setAdministratorMode } =
  slice.actions;
export default slice.reducer;
