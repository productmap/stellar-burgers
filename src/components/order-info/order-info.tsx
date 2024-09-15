import { FC, useMemo } from 'react';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient } from '@utils-types';
import {
  useGetFeedsQuery,
  useGetIngredientsQuery
} from '../../services/burgersApi';
import { useParams } from 'react-router-dom';
import { TFeedsResponse } from '../../services/utils/types';

export const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: feed = [], isLoading: feedLoading } = useGetFeedsQuery();
  const { data: ingredients = [], isLoading: ingredientsLoading } =
    useGetIngredientsQuery();

  if (feedLoading || ingredientsLoading) {
    return <Preloader />;
  }

  const orderData = (feed as TFeedsResponse).orders.find(
    (order) => order.number === Number(id)
  );

  if (!orderData) {
    return <p>Заказ не найден</p>;
  }

  /* Готовим данные для отображения */
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
  }, [orderData]);

  if (!orderInfo) {
    return <p>Заказ не найден</p>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
