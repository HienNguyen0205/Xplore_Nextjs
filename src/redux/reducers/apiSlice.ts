import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { historyProps, historyParams } from "@/utils/types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getHistory: builder.query<historyProps, historyParams>({
      query: ({from, to}) => `/history?from=${from?.toISOString()}&to=${to?.toISOString()}`,
    }),
  }),
});

export const { useGetHistoryQuery } = apiSlice;
