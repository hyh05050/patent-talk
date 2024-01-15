import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Storage } from "../modules/Storage";
import { BASE_URL, httpObject } from "./config";

// base URL과 엔드포인트들로 서비스 정의
// 엔드포인트는 query와 mutation으로 구분
// query는 GET, mutation은 POST로 요청
// query는 비동기로 처리되고, mutation은 동기로 처리
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = Storage.get("authToken");
      if (token) {
        headers.set("X-AUTH-TOKEN", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccountList: builder.query({
      query: () => `/account`,
    }),
    getAccountInfo: builder.query({
      query: (payload) => `/account/${payload}`,
    }),
    requestVerifyCode: builder.query({
      query: (payload) => `/account/requestVerifyCode/${payload}`,
    }),
    login: builder.mutation({
      query: (payload) => httpObject("/login", "POST", payload),
    }),
    join: builder.mutation({
      query: (payload) => httpObject("/join", "POST", payload),
    }),
    updateInfo: builder.mutation({
      query: (payload) => httpObject("/account", "PUT", payload),
    }),
    updatePassword: builder.mutation({
      query: (payload) => httpObject("/change/password", "POST", payload),
    }),
  }),
});

// 정의된 엔드포인트에서 자동으로 생성된 훅을 함수형 컴포넌트에서 사용하기 위해 export
export const { useGetAccountListQuery, useGetAccountInfoQuery, useRequestVerifyCodeQuery, useLoginMutation, useJoinMutation, useUpdateInfoMutation, useUpdatePasswordMutation } = accountApi;
