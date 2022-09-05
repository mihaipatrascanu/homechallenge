import { apiSlice } from "../../api/api";

export const currencies = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all Currencies
    getCurrencies: builder.query({
      query: () => ({
        url: "currency",
        method: "GET",
      }),
    }),

    // Get Single Currency
    getCurrency: builder.mutation({
      query: (id) => ({
        url: "single-currency",
        method: "POST",
      }),
    }),

    // Convert Currencies
    postCurrencies: builder.mutation({
      query: ({ from, to, amount }) => ({
        url: "convert",
        method: "POST",
        body: {
          from,
          to,
          value: amount,
        },
      }),
    }),
  }),
});

export const { useGetCurrenciesQuery, usePostCurrenciesMutation } = currencies;
