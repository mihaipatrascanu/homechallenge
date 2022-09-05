import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/api";
import userSliceReducer from "./features/auth/userSlice";

const authPersistConfig = {
  key: "auth_volopa",
  version: 1,
  storage,
  whitelist: ["email", "access_token", "refresh_token"],
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userSliceReducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
