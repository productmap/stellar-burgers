import React, { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useRegistrationMutation } from '../../services/api/burgersApi';
import { setUser } from '@slices';
import { CustomError } from '@store-types';

interface MyComponentProps {
  onPointerEnterCapture?: (e: React.PointerEvent<HTMLDivElement>) => void;
}

export const Register: FC<MyComponentProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [register, { isLoading }] = useRegistrationMutation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setError('Нужно ввести имя, почту и пароль');
      return;
    }

    try {
      const response = register({ name: userName, email, password }).unwrap();
      dispatch(setUser(response));
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as CustomError).data.message || 'Что-то пошло не так');
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
