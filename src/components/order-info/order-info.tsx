import { FC, useMemo } from 'react';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient } from '@utils-types';
import {
  useGetFeedsQuery,
  useGetIngredientsQuery
} from '../../services/api/burgersApi';
import { useParams } from 'react-router-dom';
import { TFeedsResponse } from '@store-types';

export const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: feed = [], isLoading: feedLoading } = useGetFeedsQuery();
  const { data: ingredients = [], isLoading: ingredientsLoading } =
    useGetIngredientsQuery();

  const isLoading = feedLoading || ingredientsLoading;
  const orderData = useMemo(() => {
    if (isLoading) return null;
    return (feed as TFeedsResponse).orders.find(
      (order) => order.number === Number(id)
    );
  }, [feed, id, isLoading]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <p>Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
