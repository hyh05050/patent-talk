import { createSlice } from "@reduxjs/toolkit";

// initialState는 accountSlice의 state의 초기값이다.
const defaultData = {
  modalState: false,
  modalType: "",
  modalData: null,
  callback: null,
};

const initialState = {
  alert: { ...defaultData },
  matching: { ...defaultData },
};

// accountSlice는 account의 state를 변경하는 reducer를 가지고 있다.
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAlertModal: (state, action) => {
      if (action.payload) {
        state.alert = action.payload;
      } else {
        state.alert = {
          ...defaultData,
        };
      }
    },

    setPreMatchingModal: (state, action) => {
      if (action.payload) {
        state.matching = action.payload;
      } else {
        state.matching = {
          ...defaultData,
        };
      }
    },
  },
});

// accountSlice의 reducer를 export한다.
export const { setAlertModal, setPreMatchingModal } = modalSlice.actions;

export default modalSlice.reducer;
