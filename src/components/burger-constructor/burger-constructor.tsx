import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useOrderBurgerMutation } from '../../services/api/burgersApi';
import {
  clearConstructor,
  resetOrder,
  setOrderModalData,
  setOrderRequest
} from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { constructorItems } = useAppSelector((store) => store.burger);
  const { orderRequest, orderModalData } = useAppSelector(
    (store) => store.order
  );
  const user = useAppSelector((store) => store.user);
  const [orderBurger] = useOrderBurgerMutation();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user.isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

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
