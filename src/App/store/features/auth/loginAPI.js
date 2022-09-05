import { apiSlice } from "../../api/api";

export const login = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),

    verify: builder.mutation({
      query: (refresh_token) => ({
        url: "verify",
        method: "POST",
        body: {
          refresh_token: refresh_token,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyMutation } = login;
