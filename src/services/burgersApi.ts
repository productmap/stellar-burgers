import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  TAuthResponse,
  TFeedsResponse,
  TIngredientsResponse,
  TLoginData,
  TLoginResponse,
  TRefreshResponse,
  TRegisterData,
  TServerResponse
} from '@store-types';

const URL = process.env.BURGER_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  }
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);
  console.log(response);
  if (response.error?.status === 401 || response.error?.status === 403) {
    if (localStorage.getItem('refreshToken')) {
      const refreshResponse = await baseQuery(
        {
          url: '/auth/token',
          method: 'POST',
          body: { token: localStorage.getItem('refreshToken') }
        },
        api,
        extraOptions
      );

      const tokens = refreshResponse as {
        data: { accessToken: string; refreshToken: string };
      };

      if (refreshResponse) {
        Cookies.set('accessToken', tokens.data.accessToken);
        localStorage.setItem('refreshToken', tokens.data.refreshToken);
      } else {
        localStorage.clear();
        Cookies.remove('accessToken');
      }
    }
  }
  return response;
};

export const burgersApi = createApi({
  reducerPath: 'burgersApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse['data'], void>({
      query: () => '/ingredients',
      transformResponse: (response: TIngredientsResponse) => {
        if (response.success) {
          return response.data;
        }
        throw new Error('Не получилось получить ингредиенты');
      }
    }),
    getFeeds: builder.query<TFeedsResponse, void>({
      query: () => `/orders/all`
    }),
    getOrders: builder.query<TFeedsResponse, void>({
      query: () => '/orders'
    }),
    refreshToken: builder.mutation<TRefreshResponse, void>({
      query: () => ({
        url: '/auth/token',
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken')
        })
      }),
      transformResponse: (response: TRefreshResponse) => {
        localStorage.setItem('refreshToken', response.refreshToken);
        Cookies.set('accessToken', response.accessToken);
        return response;
      }
    }),
    registration: builder.mutation<TAuthResponse, TRegisterData>({
      query: (payload) => ({
        url: `/auth/register`,
        method: 'POST',
        body: payload
      }),
      transformResponse: (response: TAuthResponse) => {
        Cookies.set('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response;
      }
    }),
    login: builder.mutation<TLoginResponse, TLoginData>({
      query: (payload) => ({
        url: `/auth/login`,
        method: 'POST',
        body: payload
      }),
      transformResponse: (response: TLoginResponse) => {
        Cookies.set('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response;
      }
    }),
    logout: builder.mutation<TServerResponse<{}>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: { token: localStorage.getItem('refreshToken') }
      }),
      transformResponse: (response: TServerResponse<{}>) => {
        Cookies.remove('accessToken');
        localStorage.removeItem('refreshToken');
        return response;
      }
    }),
    resetPassword: builder.mutation<
      TServerResponse<{}>,
      { password: string; token: string }
    >({
      query: (data) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: data
      })
    }),
    orderBurger: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: 'POST',
        body: {
          ingredients: payload,
          token: Cookies.get('accessToken')
        }
      })
    })
  })
});

export const {
  useGetIngredientsQuery,
  useGetFeedsQuery,
  useGetOrdersQuery,
  useRefreshTokenMutation,
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useOrderBurgerMutation
} = burgersApi;
