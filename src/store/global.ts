import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TGlobalState, TUserState } from "./types";

export const SLICE_NAME = "global";

const initialState: TGlobalState = {
  isAppReady: false,
  alert: {
    isOpen: false,
    message: "",
    severity: undefined
  }
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
    }
  }
});

export const { setIsAppReady, setAlert, dismissAlert } = slice.actions;
export default slice.reducer;
