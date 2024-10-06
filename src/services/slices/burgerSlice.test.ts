import { expect } from '@jest/globals';
import { UnknownAction } from 'redux';
import reducer, {
  addIngredient,
  initialState,
  removeIngredient
} from './burgerSlice';
import { TConstructorIngredient } from '@utils-types';

describe('burgerSlice reducer', () => {
  const bun: TConstructorIngredient = {
    _id: '123',
    id: '123',
    type: 'bun',
    name: 'Bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const ingredient: TConstructorIngredient = {
    _id: '123',
    id: '123',
    type: 'ingredient',
    name: 'Ingredient',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it('должен добавлять ингредиент', () => {
    const state = reducer(initialState, addIngredient(ingredient));
    expect(state.constructorItems.ingredients).toContain(ingredient);
  });

  it('должен добавлять булку', () => {
    const state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun).toBe(bun);
  });

  it('должен удалять ингредиент', () => {
    const state = reducer(
      {
        ...initialState,
        constructorItems: { bun: null, ingredients: [ingredient] }
      },
      removeIngredient(ingredient.id)
    );
    expect(state.constructorItems.ingredients).not.toContain(ingredient);
  });

  it('не должен удалять несуществующий ингредиент', () => {
    const state = reducer(initialState, removeIngredient('non-existent-id'));
    expect(state.constructorItems.ingredients).toEqual([]);
  });
});
