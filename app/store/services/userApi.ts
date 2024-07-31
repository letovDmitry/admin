import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  phone: String;
  hash: String;

  isBooster: Boolean;

  ordersFrom: Array<any>;
  ordersTo: Array<any>;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://anyboost.ru/api/users",
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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/me",
          method: "GET",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      providesTags: ["User"],
    }),

    changeUser: builder.mutation<IUser, Partial<IUser>>({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/",
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation<IUser, { newPassword: string }>({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/password",
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<IUser, void>({
      query(data) {
        const access_token_admin = Cookies.get("access_token_admin", { path: '/admin' });
        return {
          url: "/",
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token_admin}`,
          },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await Cookies.remove("access_token_admin", { path: '/admin' });
          await Cookies.remove("isBooster", { path: '/admin' });

          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useChangePasswordMutation,
  useChangeUserMutation,
  useDeleteUserMutation,
} = userApi;
