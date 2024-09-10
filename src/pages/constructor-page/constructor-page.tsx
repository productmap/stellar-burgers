import { FC } from 'react';
import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { useGetIngredientsQuery } from '../../services/burgersApi';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const { data, isError, error, isLoading, isFetching } =
    useGetIngredientsQuery();

  console.log(data);

  return (
    <>
      {isError ? (
        <p>
          Произошла ошибка:
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      ) : isLoading || isFetching ? (
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
