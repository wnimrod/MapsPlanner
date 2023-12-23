import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchCurrentUser } from "../api/users";
import { TUserState } from "./types";

const initialState: TUserState = null;

export const SLICE_NAME = "user";

export const fetchCurrentUserThunk = createAsyncThunk<IAPIUser | null>(
  "users/fetchCurrentUser",
  fetchCurrentUser
);

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrentUserThunk.fulfilled,
      (state, { payload: user }: { payload: IAPIUser | null }): TUserState => {
        console.log("Fullfilled with", user);
        if (user === null) {
          return { isLoggedIn: false };
        } else {
          return { isLoggedIn: true, ...user };
        }
      }
    );
  }
});

export const {} = slice.actions;
export default slice.reducer;
