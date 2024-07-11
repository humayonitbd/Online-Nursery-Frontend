//localhost:5000/api/v1/product-payment/create-payment-intent

 import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentSecret: builder.mutation({
      query: (data) => ({
        url: "/product-payment/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default paymentApi;
