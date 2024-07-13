import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://online-nursery-backend.vercel.app/api/v1",
  }),
  tagTypes: ["category", "product"],
  endpoints: () => ({}),
});
