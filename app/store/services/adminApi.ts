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
  baseUrl: "https://anyboost.ru/api/admin",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log(result.error);
    Cookies.remove("access_token_admin", { path: '/admin' });
    window.location.reload();
  }
  return result;
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Booster'],
  endpoints: (builder) => ({
    getBoosters: builder.query<
      any,
      void
    >({
      query() {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      providesTags: ['Booster']
    }),


    createBooster: builder.mutation<
      any,
      { email: string; password: string }
    >({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ['Booster']
    }),

    approveBooster: builder.mutation<
      any,
      { boosterId: number; }
    >({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/approve",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ['Booster']
    }),

    cancelBooster: builder.mutation<
      any,
      { boosterId: number; }
    >({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/cancel",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ['Booster']
    }),

    deleteBooster: builder.mutation<
      any,
      { boosterId: number; }
    >({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/",
          method: "DELETE",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ['Booster']
    }),

    
  }),
});

export const { useApproveBoosterMutation, useCancelBoosterMutation, useCreateBoosterMutation, useGetBoostersQuery, useDeleteBoosterMutation } = adminApi;
