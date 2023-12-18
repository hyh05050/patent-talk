import { createSlice } from "@reduxjs/toolkit";
import { agentApi } from "../../api/agent";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  agent: {
    agentNo: "",
    birth: "",
    mainArea: "",
    name: "",
    no: "",
    kpaaId: "",
    officeName: "",
    subArea1: "",
    subArea2: "",
    subArea3: "",
    qualification: "",
  },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setAgent: (state, action) => {
      const { agentNo, birth, mainArea, name, no, kpaaId, officeName, subArea1, subArea2, subArea3, qualification } =
        action.payload;
      state.agent = {
        agentNo,
        birth,
        mainArea,
        name,
        no,
        kpaaId,
        officeName,
        subArea1,
        subArea2,
        subArea3,
        qualification,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // addMatcher는 accountApi의 reducer를 추가한다.
      // accountApi.endpoints.login.matchFulfilled는 accountApi.login의 response가 성공했을 때 실행된다.
      .addMatcher(
        (action) => agentApi.endpoints.getAgentInfo.matchFulfilled(action),
        (state, { payload }) => {
          console.log(payload);
          if (payload.status === "success") {
            const {
              agentNo,
              birth,
              mainArea,
              name,
              no,
              kpaaId,
              officeName,
              subArea1,
              subArea2,
              subArea3,
              qualification,
            } = payload.data;
            state.agent = {
              agentNo,
              birth,
              mainArea,
              name,
              no,
              kpaaId,
              officeName,
              subArea1,
              subArea2,
              subArea3,
              qualification,
            };
          }
        }
      );
  },
});

// accountSlice의 reducer를 export한다.
export const { setAgent } = agentSlice.actions;

export default agentSlice.reducer;
