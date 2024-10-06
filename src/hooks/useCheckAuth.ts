import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../services/store';
import { useGetUserQuery } from '../services/api/burgersApi';
import { getUser, setUser } from '@slices';
import Cookies from 'js-cookie';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const accessToken = Cookies.get('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const { data: user } = useGetUserQuery(undefined, {
    skip: !(accessToken && refreshToken) // Если нет токенов, то автозапрос не нужен
  });
  const { currentUser } = useAppSelector(getUser);

  useEffect(() => {
    // Если нет токенов, то пользователь не авторизован
    if (!accessToken || !refreshToken) return;

    // Если пользователь авторизован, то получаем данные юзера
    if (user && !currentUser.name) {
      dispatch(setUser(user));
    }
  }, [user, currentUser]);
};
