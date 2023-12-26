import { createSlice } from "@reduxjs/toolkit";
import { matchingApi } from "../../api/matching";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  matching: { matchingId: "", name: "", company: "", typeList: [], careerList: [], expList: [], createdAt: "" },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const matchingSlice = createSlice({
  name: "matching",
  initialState,
  reducers: {
    setMatching: (state, action) => {
      const { matchingId, name, company, typeList, careerList, expList, createdAt } = action.payload;
      state.matching = { matchingId, name, company, typeList, careerList, expList, createdAt };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => matchingApi.endpoints.getMatching.matchFulfilled(action),
        (state, { payload }) => {
          // console.log(payload);
          if (payload.status === "success") {
            const { matchingId, name, company, typeList, careerList, expList, createdAt } = payload.data;
            state.matching = { matchingId, name, company, typeList, careerList, expList, createdAt };
          }
        }
      )
      .addMatcher(matchingApi.endpoints.addMatching.matchFulfilled, (state, { payload }) => {
        const { matchingId, name, company, typeList, careerList, expList, createdAt } = payload.data;
        state.matching = { matchingId, name, company, typeList, careerList, expList, createdAt };
      });
  },
});

export const { setMatching } = matchingSlice.actions;

export default matchingSlice.reducer;
