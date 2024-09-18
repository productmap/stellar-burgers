import { createSlice } from '@reduxjs/toolkit';
import { TBurgerSliceState, TConstructorIngredient } from '@utils-types';

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
    addIngredient(state, action: { payload: TConstructorIngredient }) {
      if (action.payload) {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
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
