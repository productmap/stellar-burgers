import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { shallowEqual } from 'react-redux';

export const AppHeader: FC = () => {
  const { currentUser } = useAppSelector((store) => store.user, shallowEqual);
  return <AppHeaderUI userName={currentUser ? currentUser.name : ''} />;
};
