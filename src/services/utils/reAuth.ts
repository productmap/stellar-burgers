import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { TRefreshResponse } from '@store-types';

const URL = process.env.BURGER_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.status === 401 || response.error?.status === 403) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResponse = await baseQuery(
        {
          url: '/auth/token',
          method: 'POST',
          body: { token: refreshToken }
        },
        api,
        extraOptions
      );

      if (refreshResponse.data) {
        const tokens = refreshResponse.data as TRefreshResponse;
        Cookies.set('accessToken', tokens.accessToken, {
          secure: true,
          sameSite: 'Strict'
        });
        localStorage.setItem('refreshToken', tokens.refreshToken);

        // Повторная попытка выполнить исходный запрос с новым токеном доступа
        response = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.clear();
        Cookies.remove('accessToken');
      }
    }
  }
  return response;
};
