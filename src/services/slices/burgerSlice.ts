import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TBurgerSliceState, TIngredient } from '@utils-types';

const initialState: TBurgerSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState: initialState,
  reducers: {
    addIngredient(state, action: { payload: TIngredient }) {
      if (action.payload) {
        const ingredient = { id: nanoid(), ...action.payload };
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = ingredient;
        } else {
          state.constructorItems.ingredients.push(ingredient);
        }
      }
    },
    removeIngredient(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    clearConstructor(state) {
      state.constructorItems = initialState.constructorItems;
    },
    moveUpIngredient(state, action) {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i.id === action.payload
      );
      if (index > 0) {
        const ingredient = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = ingredient;
      }
    },
    moveDownIngredient(state, action) {
      const index = state.constructorItems.ingredients.findIndex(
        (i) => i.id === action.payload
      );
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredient = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = ingredient;
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveUpIngredient,
  moveDownIngredient
} = burgerSlice.actions;
export default burgerSlice.reducer;
