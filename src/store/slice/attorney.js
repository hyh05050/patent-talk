import { createSlice } from "@reduxjs/toolkit";
import { attorneyApi } from "../../api/attorney";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  account: { accountKey: "", password: "", humanName: "", role: "" },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const attorneySlice = createSlice({
  name: "attorney",
  initialState,
  reducers: {
    setAttorney: (state, action) => {
      const { accountKey, password, humanName, role } = action.payload;
      state.account = { accountKey, password, humanName, role };
    },
  },
  extraReducers: (builder) => {
    builder
      // addMatcher는 accountApi의 reducer를 추가한다.
      // accountApi.endpoints.login.matchFulfilled는 accountApi.login의 response가 성공했을 때 실행된다.
      .addMatcher(
        (action) => attorneyApi.endpoints.getMatching.matchFulfilled(action),
        (state, { payload }) => {
          console.log(payload);
          if (payload.status === "success") {
            const { accountKey, password, humanName, role } = payload.data;
            state.account = { accountKey, password, humanName, role };
          }
        }
      )
      .addMatcher(attorneyApi.endpoints.addMatching.matchFulfilled, (state, { payload }) => {
        const { accountKey, password, humanName } = payload.data;
        state.account.accountKey = accountKey;
        state.account.password = password;
        state.account.humanName = humanName;
      });
  },
});

// accountSlice의 reducer를 export한다.
export const { setAttorney } = attorneySlice.actions;

export default attorneySlice.reducer;
