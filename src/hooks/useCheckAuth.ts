import { useEffect } from 'react';
import { useAppDispatch } from '../services/store';
import { useGetUserQuery } from '../services/api/burgersApi';
import { clearUser, setUser } from '@slices';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserQuery();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Если нет токенов, то пользователь не авторизован
    if (!accessToken || !refreshToken) {
      dispatch(clearUser());
      return;
    }

    // Если пользователь авторизован, то получаем данные юзера
    if (user && !error) {
      dispatch(setUser(user));
    } else if (error) {
      navigate('/login');
    }
  }, [user, error, dispatch, navigate]);
};
