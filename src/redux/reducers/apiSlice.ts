import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  historyProps,
  historyParams,
  tourDetailData,
  mesResponse,
  tourSlotData,
} from "@/utils/types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["avatar"],
  endpoints: (builder) => ({
    getHistory: builder.query<historyProps, historyParams>({
      query: ({ from, to }) =>
        `/history?from=${from?.toISOString()}&to=${to?.toISOString()}`,
    }),
    getTourById: builder.query<tourDetailData, string>({
      query: (id) => `/tour/get-tour-by-id?id=${id}`,
    }),
    getAvatar: builder.query<{ avatar: string }, void>({
      query: () => `/user/get-avatar`,
      providesTags: ["avatar"],
    }),
    getTourSlot: builder.query<tourSlotData, string>({
      query: (id) => `/tour/get-tour-slot?id=${id}`,
    }),
    changeAvatar: builder.mutation<mesResponse, string>({
      query: (avatar) => ({
        url: "/user/change-avatar",
        method: "POST",
        body: { avatar },
      }),
      invalidatesTags: ["avatar"],
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useGetTourByIdQuery,
  useGetAvatarQuery,
  useChangeAvatarMutation,
  useGetTourSlotQuery,
} = apiSlice;
