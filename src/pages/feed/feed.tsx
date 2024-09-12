import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useGetFeedsQuery } from '../../services/burgersApi';

export const Feed: FC = () => {
  const {
    data: feeds = { orders: [] },
    isError,
    isLoading,
    isFetching,
    refetch
  } = useGetFeedsQuery();

  if (isError) {
    return <p>'Произошла ошибка'</p>;
  }

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  return <FeedUI orders={feeds.orders} handleGetFeeds={() => refetch()} />;
};
