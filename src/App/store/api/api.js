import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutUser, updateUser } from "../features/auth/userSlice";

const BASE_URL = "http://homechallenge.databees.uk/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.access_token;

    // console.log("token", token);

    if (headers.get("Authorization")) {
      return headers;
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send the refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const email = api.getState().user.email;

      // store new token
      api.dispatch(
        updateUser({
          email,
          access_token: refreshResult.data.access_token,
          refresh_token: refreshResult.data.refresh_token,
        })
      );

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOutUser());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
});
