import { createSlice } from "@reduxjs/toolkit";
import { preMatchingApi } from "../../api/preMatching";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  preMatching: { preMatchingId: "", type: "", subType: "", name: "", keyword: "", detail: "", createdAt: "" },
  agentList: [],
  quotationList: [],
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const preMatchingSlice = createSlice({
  name: "preMatching",
  initialState,
  reducers: {
    setPreMatching: (state, action) => {
      const { preMatchingId, type, subType, name, keyword, detail } = action.payload;
      state.preMatching = { preMatchingId, type, subType, name, keyword, detail };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(preMatchingApi.endpoints.addPreMatching.matchFulfilled, (state, { payload }) => {
        if (payload.status === "success") {
          const { preMatchingId, type, subType, name, keyword, detail, createdAt } = payload.data;
          state.preMatching = { preMatchingId, type, subType, name, keyword, detail, createdAt };
        }
      })
      .addMatcher(preMatchingApi.endpoints.getAgentList.matchFulfilled, (state, { payload }) => {
        if (payload.status === "success") {
          state.agentList = payload.data;
        }
      })
      .addMatcher(preMatchingApi.endpoints.getQuatationList.matchFulfilled, (state, { payload }) => {
        if (payload.status === "success") {
          state.quotationList = payload.data;
        }
      });
  },
});

export const { setPreMatching } = preMatchingSlice.actions;

export default preMatchingSlice.reducer;
