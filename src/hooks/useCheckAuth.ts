import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../services/store';
import { useGetUserQuery } from '../services/api/burgersApi';
import { getUser, setUser } from '@slices';
import Cookies from 'js-cookie';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();
  const { currentUser } = useAppSelector(getUser);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Если нет токенов, то пользователь не авторизован
    if (!accessToken || !refreshToken) return;

    // Если пользователь авторизован, то получаем данные юзера
    if (user && !currentUser.name) {
      dispatch(setUser(user));
    }
  }, [user, currentUser]);
};
