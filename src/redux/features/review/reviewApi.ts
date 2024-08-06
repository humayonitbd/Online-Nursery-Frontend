
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
      query: (id) => ({
        url: `/product-review?productId=${id}`,
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

    addReviewLike: builder.mutation({
      query: (data) => ({
        url: `/product-review/add-like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviewsLike", "reviews"],
      // invalidatesTags: ["reviews"],
    }),

    allReviewLike: builder.query({
      query: (email) => ({
        url: `/product-review/like?email=${email}`,
        method: "GET",
      }),
      providesTags: ["reviewsLike"],
    }),

    deleteReviewLike: builder.mutation({
      query: () => ({
        url: `/product-review/like`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviewsLike"],
    }),
  }),
});

export default reviewApi;
