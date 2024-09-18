import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../services/store';
import { useGetUserQuery } from '../services/api/burgersApi';
import { clearUser, setUser } from '@slices';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserQuery();

  const handleDispatch = useCallback(
    (action: any) => {
      dispatch(action);
    },
    [dispatch]
  );

  const handleNavigate = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      handleDispatch(clearUser());
      return;
    }

    if (user) {
      handleDispatch(setUser(user));
    } else if (error) {
      handleNavigate('/login');
    }
  }, [user, error, handleDispatch, handleNavigate]);
};
