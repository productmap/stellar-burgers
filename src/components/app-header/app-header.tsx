import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { getUser } from '@slices';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const { currentUser } = useAppSelector(getUser);
  return <AppHeaderUI userName={currentUser ? currentUser.name : ''} />;
};
