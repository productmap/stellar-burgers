import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TFeedsResponse, TIngredient, TOrder } from '@utils-types';

const URL = process.env.BURGER_API_URL;

export const burgersApi = createApi({
  reducerPath: 'burgersApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => `/ingredients`,
      transformResponse: (response: { data: TIngredient[] }) => response.data
    }),
    getFeed: builder.query<TFeedsResponse, void>({
      query: () => `/orders/all`
      // transformResponse: (response: { orders: TOrder[] }) => response.orders
      // transformResponse: (response: TFeedsResponse) => {
      //   if (response.success) return response;
      //   throw response;
      // }
    })
  })
});

export const { useGetIngredientsQuery, useGetFeedQuery } = burgersApi;
