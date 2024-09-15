import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useOrderBurgerMutation } from '../../services/burgersApi';
import {
  resetOrder,
  setOrderModalData,
  setOrderRequest
} from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/burgerSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { constructorItems } = useAppSelector((store) => store.burger);
  const { orderRequest, orderModalData } = useAppSelector(
    (store) => store.order
  );
  const [orderBurger] = useOrderBurgerMutation();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsList = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id)
    ];

    dispatch(setOrderRequest(true));
    const response = await orderBurger(ingredientsList).unwrap();
    dispatch(setOrderModalData(response.order));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
