import React, { FC } from 'react';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(styles.link, 'ml-2 mr-10 text text_type_main-default', {
              [styles.link_active]: isActive
            })
          }
        >
          <BurgerIcon type={'secondary'} />
          Конструктор
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            clsx(styles.link, 'pr-5 pl-5 text text_type_main-default', {
              [styles.link_active]: isActive
            })
          }
        >
          <ListIcon type='secondary' />
          Лента заказов
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            clsx(styles.link, 'text text_type_main-default ml-2', {
              [styles.link_active]: isActive
            })
          }
        >
          <ProfileIcon type='secondary' />
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
