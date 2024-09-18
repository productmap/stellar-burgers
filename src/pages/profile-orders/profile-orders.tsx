import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useGetOrdersQuery } from '../../services/api/burgersApi';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const {
    data: feed = { orders: [] },
    isError,
    isLoading
  } = useGetOrdersQuery();

  if (isError) {
    return <p>'Произошла ошибка'</p>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={feed.orders} />;
};
