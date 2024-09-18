import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { getUser } from '@slices';

export const AppHeader: FC = () => {
  const { currentUser } = useAppSelector(getUser);
  return <AppHeaderUI userName={currentUser ? currentUser.name : ''} />;
};
