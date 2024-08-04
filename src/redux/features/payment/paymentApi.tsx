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

    productBookingPayment: builder.mutation({
      query: (payment) => ({
        url: "/booking/booking-payment",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["orderProduct"],
    }),
    ordersConformProducts: builder.query({
      query: (queryParams) => {
        let url = "/booking/users/bookings";
        if (queryParams) {
          url = `/booking/users/bookings?userEmail=${queryParams}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      
      providesTags: ["orderProduct"],
    }),
    ordersConformProductsDelete: builder.mutation({
      query: (id) => ({
        url: `/booking/users/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orderProduct"],
    }),
  }),
});

export default paymentApi;
