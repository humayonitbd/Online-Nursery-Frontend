
import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    // getAllProduct: builder.query({
    //   query: (categoryName) => {
    //     console.log('categoryName', categoryName)
    //     console.log(`{/product?category=${categoryName}}`)
    //     return {
    //       url: `/product?category=${categoryName}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["product"],
    // }),
    getAllProduct: builder.query({
      query: (queryParams) => {
        let url = "/product";
        if (queryParams && Object.keys(queryParams).length > 0) {
          const queryString = new URLSearchParams(queryParams).toString();
          url = `/product?${queryString}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, updateProductData }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: updateProductData,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export default productApi;
