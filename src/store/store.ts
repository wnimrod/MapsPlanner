import { configureStore } from "@reduxjs/toolkit";

import globalReducer, { SLICE_NAME as GLOBAL_SLICE_NAME } from "./global";
import userReducer, { SLICE_NAME as USER_SLICE_NAME } from "./user";

const store = configureStore({
  reducer: {
    [GLOBAL_SLICE_NAME]: globalReducer,
    [USER_SLICE_NAME]: userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export default store;
