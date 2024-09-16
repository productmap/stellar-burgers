import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ProfileUI } from '@ui-pages';
import { useEditUserMutation } from '../../services/api/burgersApi';
import { setUser } from '@slices';

export const Profile: FC = () => {
  const { currentUser: user } = useAppSelector((store) => store.user);
  const [editUser, { data, isLoading }] = useEditUserMutation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      editUser(formValue);
      dispatch(setUser({ user: formValue }));
    } catch (err) {
      setError('Не удалось изменить данные');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      error={error}
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
