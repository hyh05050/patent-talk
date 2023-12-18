import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../../api/chat";

// initialState는 accountSlice의 state의 초기값이다.
const initialState = {
  chat: {
    id: 0,
    lastMsg: "",
    clientId: "",
    attorneyId: "",
    createdAt: null,
    updatedAt: "",
    useFlag: true,
    clientSocket: "",
    attorneySocket: "",
  },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      const { id, lastMsg, clientId, attorneyId, createdAt, updatedAt, useFlag, clientSocket, attorneySocket } =
        action.payload;
      state.chat = {
        id,
        lastMsg,
        clientId,
        attorneyId,
        createdAt,
        updatedAt,
        useFlag,
        clientSocket,
        attorneySocket,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => chatApi.endpoints.getChatRoomList.matchFulfilled(action),
      (state, { payload }) => {
        if (payload.status === "success") {
        }
      }
    );
  },
});

// accountSlice의 reducer를 export한다.
export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
