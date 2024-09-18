import { Outlet } from 'react-router-dom';
import { AppHeader } from '@components';
import styles from './app-wrapper.module.scss';

export function AppWrapper() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
}
