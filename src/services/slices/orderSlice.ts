import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderRequest: false,
  orderModalData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrderRequest(state, action) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    },
    resetOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  }
});

export const { setOrderRequest, setOrderModalData, resetOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
