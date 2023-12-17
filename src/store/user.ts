import { createSlice } from "@reduxjs/toolkit";
import { TUserState } from "./types";

const initialState: TUserState = {
  user: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = slice.actions;
export default slice.reducer;
