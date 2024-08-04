
import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: "/product-review/add-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    getAllReview: builder.query({
      query: () => ({
        url: "/product-review",
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
    singleGetReview: builder.query({
      query: (id) => {
        return {
          url: `/product-review/${id}`,
          method: "GET",
        };
      },

      providesTags: ["reviews"],
    }),
    singleDeleteReview: builder.mutation({
      query: (id) => ({
        url: `/product-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),

    singleUpdateReview: builder.mutation({
      query: ({ id, reviewUpdateData }) => ({
        url: `/product-review/${id}`,
        method: "PUT",
        body: reviewUpdateData,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export default reviewApi;
