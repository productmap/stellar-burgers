import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

type TPrivateRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

type TOnlyUnAuth = {
  children: ReactElement;
};

export function PrivateRoute({ onlyUnAuth = false, children }: TPrivateRoute) {
  const location = useLocation();
  const user = useAppSelector((store) => store.user);
  const { from } = location.state || { from: { pathname: '/' } };

  // Если авторизованный пытается перейти на путь только для неавторизованных
  if (onlyUnAuth && user.isAuthenticated) {
    return <Navigate to={from} />;
  }

  // Если неавторизованный по приватному пути
  if (!onlyUnAuth && !user.isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если неавторизованный на авторизацию
  if (onlyUnAuth && !user.isAuthenticated) {
    return children;
  }

  // Для авторизованных
  if (user.isAuthenticated) {
    return children;
  }

  return null;
}

export function OnlyUnAuth({ children }: TOnlyUnAuth): ReactElement {
  return <PrivateRoute children={children} onlyUnAuth />;
}
