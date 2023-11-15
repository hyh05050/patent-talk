import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import account from "./slice/account";
import { accountApi } from "../api/account";

const rootReducer = combineReducers({
  account,
  [accountApi.reducerPath]: accountApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export const modalSelector = (state) => state.modal;
export const accountSelector = (state) => state.account;
