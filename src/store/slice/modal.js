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
  loading: { ...defaultData },
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
    setLoadingModal: (state, action) => {
      if (action.payload) {
        state.loading = action.payload;
      } else {
        state.loading = {
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

    setAgentInformationModal: (state, action) => {
      if (action.payload) {
        state.agentInformation = action.payload;
      } else {
        state.agentInformation = {
          ...defaultData,
        };
      }
    },

    setQuotationModal: (state, action) => {
      if (action.payload) {
        state.quotation = action.payload;
      } else {
        state.quotation = {
          ...defaultData,
        };
      }
    },

    setQuotationDetailModal: (state, action) => {
      if (action.payload) {
        state.quotationDetail = action.payload;
      } else {
        state.quotationDetail = {
          ...defaultData,
        };
      }
    },
  },
});

// accountSlice의 reducer를 export한다.
export const { setAlertModal, setLoadingModal, setPreMatchingModal, setAgentInformationModal, setQuotationModal, setQuotationDetailModal } = modalSlice.actions;

export default modalSlice.reducer;
