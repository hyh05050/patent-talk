import { createSlice } from "@reduxjs/toolkit";
import { accountApi } from "../../api/account";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  account: { accountKey: "", password: "", humanName: "", role: "" },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      const { accountKey, password, humanName, role } = action.payload;
      state.account = { accountKey, password, humanName, role };
    },
  },
  extraReducers: (builder) => {
    builder
      // addMatcher는 accountApi의 reducer를 추가한다.
      // accountApi.endpoints.login.matchFulfilled는 accountApi.login의 response가 성공했을 때 실행된다.
      .addMatcher(
        (action) =>
          accountApi.endpoints.login.matchFulfilled(action) || accountApi.endpoints.join.matchFulfilled(action),
        (state, { payload }) => {
          // console.log(payload);
          if (payload.status === "success") {
            const { accountKey, password, humanName, roles } = payload.data;
            state.account = { accountKey, password, humanName, roles };
          }
        },
      );
    // .addMatcher(accountApi.endpoints.join.matchFulfilled, (state, { payload }) => {
    //   const { accountKey, password, humanName } = payload.data;
    //   state.account.accountKey = accountKey;
    //   state.account.password = password;
    //   state.account.humanName = humanName;
    // });
  },
});

// accountSlice의 reducer를 export한다.
export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
