
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

    deleteUpdateReviewLike: builder.mutation({
      query: ({ id, deleteData }) => ({
        url: `/product-review/like/${id}`,
        method: "PUT",
        body: deleteData,
      }),
      invalidatesTags: ["reviewsLike", "reviews"],
    }),
    /// replay review api handle start
    addReplayReview: builder.mutation({
      query: (data) => ({
        url: "/product-review/add-replay-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["replayReview"],
    }),

    getReplayReview: builder.query({
      query: (id) => ({
        url: `/product-review/replay-review?productId=${id}`,
        method: "GET",
      }),
      providesTags: ["replayReview"],
    }),

    updateReplayReview: builder.mutation({
      query: ({ id, replayReviewUpdateData }) => ({
        url: `/product-review/replay-review/${id}`,
        method: "PUT",
        body: replayReviewUpdateData,
      }),
      invalidatesTags: ["replayReview"],
    }),
    deleteReplayReview: builder.mutation({
      query: (id) => ({
        url: `/product-review/replay-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["replayReview"],
    }),
  }),
});

export default reviewApi;
