import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordUI } from '@ui-pages';
import { useAppDispatch } from '../../services/store';
import { useResetPasswordMutation } from '../../services/api/burgersApi';
import { setUser } from '@slices';
import { CustomError } from '@store-types';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!token || !password) {
      setError('Нужно ввести токен и пароль');
      return;
    }

    try {
      const response = await resetPassword({
        password: password,
        token: token
      }).unwrap();

      if (response.success) {
        dispatch(setUser(response));
        navigate('/login', { replace: true });
      }
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
