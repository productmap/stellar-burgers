import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLoginMutation } from '../../services/api/burgersApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '@slices';
import { useAppDispatch } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Нужно ввести почту и пароль');
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUser(response));
      navigate(from.pathname, { replace: true });
    } catch (err) {
      setError('Что-то пошло не так');
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
