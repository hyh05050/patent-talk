import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import account from "./slice/account";
import attorney from "./slice/attorney";
import modal from "./slice/modal";
import preMatching from "./slice/preMatching";
import { accountApi } from "../api/account";
import { attorneyApi } from "../api/attorney";
import { preMatchingApi } from "../api/preMatching";

const rootReducer = combineReducers({
  account,
  attorney,
  modal,
  preMatching,
  [accountApi.reducerPath]: accountApi.reducer,
  [attorneyApi.reducerPath]: attorneyApi.reducer,
  [preMatchingApi.reducerPath]: preMatchingApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["modal/setAlertModal"],
        ignoredPaths: ["modal.alert.callback"],
      },
    })
      .concat(accountApi.middleware)
      .concat(attorneyApi.middleware)
      .concat(preMatchingApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export const modalSelector = (state) => state.modal;
export const accountSelector = (state) => state.account;
export const preMatchingSelector = (state) => state.preMatching;
