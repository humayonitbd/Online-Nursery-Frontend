import { baseApi } from "@/redux/api/baseApi";


const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, updatedata }) => {
        return {
          url: `/category/${id}`,
          method: "PUT",
          body: updatedata,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export default categoryApi;
