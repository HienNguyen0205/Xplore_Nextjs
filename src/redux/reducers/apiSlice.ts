import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { historyProps, historyParams, tourDetailData, mesResponse } from "@/utils/types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ['avatar'],
  endpoints: (builder) => ({
    getHistory: builder.query<historyProps, historyParams>({
      query: ({from, to}) => `/history?from=${from?.toISOString()}&to=${to?.toISOString()}`,
    }),
    getTourById: builder.query<tourDetailData, string>({
      query: id => `/tour/get-tour-by-id?id=${id}`,
    }),
    getAvatar: builder.query<{avatar: string}, void>({
      query: () => `/user/get-avatar`,
      providesTags: ['avatar']
    }),
    changeAvatar: builder.mutation<{code: number, message: string}, string>({
      query: avatar => ({
        url: '/user/change-avatar',
        method: 'POST',
        body: { avatar }
      }),
      invalidatesTags: ['avatar']
    })
  }),
});

export const { useGetHistoryQuery, useGetTourByIdQuery, useGetAvatarQuery, useChangeAvatarMutation } = apiSlice;
