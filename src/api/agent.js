import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./config";

// base URL과 엔드포인트들로 서비스 정의
// 엔드포인트는 query와 mutation으로 구분
// query는 GET, mutation은 POST로 요청
// query는 비동기로 처리되고, mutation은 동기로 처리
export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAgentList: builder.query({
      query: () => `/agent`,
    }),
    getAgentInfoByName: builder.query({
      query: (name) => `/agentNo/${name}`,
    }),
    getAgentInfoByAgentNo: builder.query({
      query: (agentNo) => `/agentNo/${agentNo}`,
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetAgentListQuery, useGetAgentInfoByNameQuery, useGetAgentInfoByAgentNoQuery } = agentApi;
