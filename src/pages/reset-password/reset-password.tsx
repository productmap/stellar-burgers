import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useResetPasswordMutation } from '../../services/api/burgersApi';
import { setUser } from '../../services/slices/userSlice';
import { useDispatch } from 'react-redux';
import { CustomError } from '@store-types';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [reset, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    useEffect(() => {
      if (!localStorage.getItem('resetPassword')) {
        navigate('/forgot-password', { replace: true });
      }
    }, [navigate]);

    if (!token || !password) {
      setError('Нужно ввести токен и пароль');
      return;
    }

    try {
      const response = await reset({ token, password }).unwrap();
      dispatch(setUser(response));
      navigate('/login', { replace: true });
    } catch (err) {
      setError((err as CustomError).data.message || 'Что-то пошло не так');
    }
  };

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      isLoading={isLoading}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
