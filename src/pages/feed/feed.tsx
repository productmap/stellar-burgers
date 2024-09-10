import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useGetFeedsQuery } from '../../services/burgersApi';

export const Feed: FC = () => {
  const {
    data: feeds = { orders: [] },
    isError,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetFeedsQuery();
  // const { orders } = data || {};

  if (isError) {
    return <>{error}</>;
  }

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return <FeedUI orders={feeds.orders} handleGetFeeds={() => refetch()} />;
};
