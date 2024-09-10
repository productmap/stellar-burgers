import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useGetFeedQuery } from '../../services/burgersApi';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { data, isError, error, isLoading, isFetching } = useGetFeedQuery();
  const { orders } = data || {};

  if (!orders || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
