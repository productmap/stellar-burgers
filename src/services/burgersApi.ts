import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TIngredient } from '@utils-types';

const URL = process.env.BURGER_API_URL;

export const burgersApi = createApi({
  reducerPath: 'burgersApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => `/ingredients`,
      transformResponse: (response: { data: TIngredient[] }) => response.data
    })
  })
});

export const { useGetIngredientsQuery } = burgersApi;
