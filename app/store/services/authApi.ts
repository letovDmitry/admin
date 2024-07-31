import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://anyboost.ru/api/auth",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<
      { access_token_admin: string; isBooster: boolean },
      { email: string; }
    >({
      query(data) {
        return {
          url: "/signupAdmin",
          method: "POST",
          body: data,
        };
      },
    }),

    recoverPassword: builder.mutation<
      { access_token_admin: string; isBooster: boolean },
      { email: string; }
    >({
      query(data) {
        return {
          url: "/recover",
          method: "POST",
          body: data,
        };
      },
    }),

    signIn: builder.mutation<
      { access_token: string; isBooster: boolean },
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: "/signinAdmin",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await Cookies.set("access_token_admin", data.access_token, { path: '/admin' });
          await Cookies.set("isBooster", data.isBooster, { path: '/admin' });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useRecoverPasswordMutation } = authApi;
