import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../utils/reAuth';
import Cookies from 'js-cookie';
import {
  TAuthResponse,
  TFeedsResponse,
  TIngredientsResponse,
  TLoginData,
  TLoginResponse,
  TRegisterData,
  TServerResponse,
  TUserResponse
} from '@store-types';

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
    registration: builder.mutation<TAuthResponse, TRegisterData>({
      query: (payload) => ({
        url: `/auth/register`,
        method: 'POST',
        body: payload
      }),
      transformResponse: (response: TAuthResponse) => {
        Cookies.set('accessToken', response.accessToken, {
          secure: true,
          sameSite: 'Strict'
        });
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
        Cookies.set('accessToken', response.accessToken, {
          secure: true,
          sameSite: 'Strict'
        });
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
        localStorage.clear();
        return response;
      }
    }),
    forgotPassword: builder.mutation<TServerResponse<{}>, { email: string }>({
      query: (data) => ({
        url: 'password-reset',
        method: 'POST',
        body: data
      })
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
    getUser: builder.query<TUserResponse, void>({
      query: () => '/auth/user'
      // transformResponse: (response: TUserResponse) => {
      //   if (response.success) {
      //     return { success: true, user: response.user };
      //   }
      //   throw new Error('Failed to get user');
      // }
    }),
    editUser: builder.mutation<TUserResponse, Partial<TRegisterData>>({
      query: (payload) => ({
        url: `/auth/user`,
        method: 'PATCH',
        body: payload
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
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useEditUserMutation,
  useOrderBurgerMutation
} = burgersApi;
