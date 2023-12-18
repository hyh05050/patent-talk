import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import account from "./slice/account";
import agent from "./slice/agent";
import modal from "./slice/modal";
import preMatching from "./slice/preMatching";
import matching from "./slice/matching";
import chat from "./slice/chat";
import { accountApi } from "../api/account";
import { agentApi } from "../api/agent";
import { preMatchingApi } from "../api/preMatching";
import { matchingApi } from "../api/matching";
import { chatApi } from "../api/chat";

const rootReducer = combineReducers({
  account,
  agent,
  modal,
  preMatching,
  matching,
  chat,
  [accountApi.reducerPath]: accountApi.reducer,
  [agentApi.reducerPath]: agentApi.reducer,
  [preMatchingApi.reducerPath]: preMatchingApi.reducer,
  [matchingApi.reducerPath]: matchingApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
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
      .concat(agentApi.middleware)
      .concat(preMatchingApi.middleware)
      .concat(matchingApi.middleware)
      .concat(chatApi.middleware),
});

setupListeners(store.dispatch);

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export const modalSelector = (state) => state.modal;
export const accountSelector = (state) => state.account;
export const preMatchingSelector = (state) => state.preMatching;
export const matchingSelector = (state) => state.matching;
export const agentSelector = (state) => state.agent;
export const chatSelector = (state) => state.chat;
