import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { currentUser = { name: '' } } = useAppSelector((store) => store.user);
  return <AppHeaderUI userName={currentUser.name} />;
};
