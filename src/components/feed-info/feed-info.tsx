import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useGetFeedsQuery } from '../../services/api/burgersApi';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { data: feed = { orders: [] } } = useGetFeedsQuery();

  const readyOrders = getOrders(feed.orders, 'done');
  const pendingOrders = getOrders(feed.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
