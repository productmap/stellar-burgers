import { FC } from 'react';
import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { useGetIngredientsQuery } from '../../services/api/burgersApi';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const { isError, error, isLoading } = useGetIngredientsQuery();

  return (
    <>
      {isError ? (
        <p>
          Произошла ошибка:
          {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </p>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
