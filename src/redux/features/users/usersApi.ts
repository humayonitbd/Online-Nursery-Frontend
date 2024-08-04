import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => {
        console.log('email', email)
        return {
          url: `/auth/user?email=${email}`,
          method: "GET",
        };
      },
    }),
  }),
});

export default userApi;

