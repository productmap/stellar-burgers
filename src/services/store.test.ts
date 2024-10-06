import { expect } from '@jest/globals';
import { rootReducer } from './store';
import { burgersApi } from './api/burgersApi';
import userReducer from './slices/userSlice';
import burgerReducer from './slices/burgerSlice';
import orderReducer from './slices/orderSlice';

interface UnknownAction {
  type: string;
  [key: string]: any;
}

describe('rootReducer', () => {
  it('должен возвращать начальное состояние, когда вызван с неопределенным состоянием и неизвестным действием', () => {
    const initialState = {
      [burgersApi.reducerPath]: burgersApi.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      } as UnknownAction),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' } as UnknownAction),
      burger: burgerReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      } as UnknownAction),
      order: orderReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      } as UnknownAction)
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = rootReducer(undefined, action);

    expect(nextState).toEqual(initialState);
  });
});
