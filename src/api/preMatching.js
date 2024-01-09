import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, httpObject } from "./config";
import { Storage } from "../modules/Storage";

// base URL과 엔드포인트들로 서비스 정의
// 엔드포인트는 query와 mutation으로 구분
// query는 GET, mutation은 POST로 요청
// query는 비동기로 처리되고, mutation은 동기로 처리
export const preMatchingApi = createApi({
  reducerPath: "preMatchingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = Storage.get("authToken");
      if (token) {
        headers.set("X-AUTH-TOKEN", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPreMatchingList: builder.query({
      query: (payload) => `/preMatching?orderId=${payload.order_id}`,
      keepUnusedDataFor: 0,
    }),
    getPreMatchingListSchTxt: builder.query({
      query: (payload) => `/preMatching?schTxt=${payload.schTxt}`,
      keepUnusedDataFor: 0,
    }),
    getPreMatchingListAID: builder.query({
      query: (payload) => `/preMatching/attorney/${payload.agentNo}`,
      keepUnusedDataFor: 0,
    }),
    getPreMatching: builder.query({
      query: (payload) => `/preMatching/${payload}`,
      keepUnusedDataFor: 0,
    }),
    getAgentList: builder.mutation({
      query: (payload) => httpObject("/preMatching/agentList", "POST", payload),
    }),
    getQuotationList: builder.mutation({
      query: (payload) => httpObject("/preMatching/quotationList", "POST", payload),
    }),
    addPreMatching: builder.mutation({
      query: (payload) => httpObject("/preMatching", "POST", payload),
    }),
    addMatching: builder.mutation({
      query: (payload) => httpObject("/preMatching/selectQuotation", "POST", payload),
    }),
    setQuotation: builder.mutation({
      query: (payload) => httpObject("/preMatching/sendQuotation", "POST", payload),
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const {
  useGetPreMatchingListQuery,
  useGetPreMatchingListSchTxtQuery,
  useGetPreMatchingListAIDQuery,
  useGetPreMatchingQuery,
  useAddPreMatchingMutation,
  useGetAgentListMutation,
  useGetQuotationListMutation,
  useAddMatchingMutation,
  useSetQuotationMutation,
} = preMatchingApi;
