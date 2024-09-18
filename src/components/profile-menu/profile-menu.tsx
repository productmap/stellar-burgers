import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { useLogoutMutation } from '../../services/api/burgersApi';
import { clearUser } from '@slices';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    dispatch(clearUser());
    logout();
    navigate('/', { replace: true });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
