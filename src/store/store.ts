import { configureStore } from "@reduxjs/toolkit";

import globalReducer, { SLICE_NAME as GLOBAL_SLICE_NAME } from "./global";

const store = configureStore({
  reducer: {
    [GLOBAL_SLICE_NAME]: globalReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export default store;
