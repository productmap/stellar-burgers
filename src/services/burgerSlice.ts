import { createSlice, nanoid } from '@reduxjs/toolkit';
import { BurgerSliceState, TIngredient } from '@utils-types';

const initialState: BurgerSliceState = {
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
    }
  }
});

export const { addIngredient, removeIngredient } = burgerSlice.actions;
export default burgerSlice.reducer;
