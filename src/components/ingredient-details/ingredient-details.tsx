import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useGetIngredientsQuery } from '../../services/api/burgersApi';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const {
    data: ingredients = [],
    isLoading,
    isFetching
  } = useGetIngredientsQuery();
  const { id } = useParams();

  if (isLoading || isFetching) {
    return <Preloader />;
  }

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  ) as TIngredient;

  if (!ingredientData) {
    return <p>Такого ингредиента нет</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
