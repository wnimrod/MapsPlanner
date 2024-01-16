import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { toggleAdministratorMode } from "src/api/interceptors/administratorModeInterceptor";

import { TGlobalState } from "./types";

export const SLICE_NAME = "global";

const initialState: TGlobalState = {
  isAppReady: false,
  alert: {
    isOpen: false,
    message: "",
    severity: undefined
  },
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
    setAdministratorMode: (
      state: TGlobalState,
      { payload: isAdministratorMode }: PayloadAction<boolean>
    ) => {
      state.administratorMode = isAdministratorMode;
      toggleAdministratorMode(isAdministratorMode);
    }
  }
});

export const { setIsAppReady, setAdministratorMode } = slice.actions;
export default slice.reducer;
