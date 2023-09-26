import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { historyProps, historyParams, tourDetailData } from "@/utils/types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getHistory: builder.query<historyProps, historyParams>({
      query: ({from, to}) => `/history?from=${from?.toISOString()}&to=${to?.toISOString()}`,
    }),
    getTourById: builder.query<tourDetailData, string>({
      query: id => `/tour/get-tour-by-id?id=${id}`,
    })
  }),
});

export const { useGetHistoryQuery, useGetTourByIdQuery } = apiSlice;
