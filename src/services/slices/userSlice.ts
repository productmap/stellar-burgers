import { createSlice } from '@reduxjs/toolkit';

type TUser = {
  isAuthenticated: boolean;
  currentUser: {
    name: string;
    email: string;
  };
};

const initialState: TUser = {
  isAuthenticated: false,
  currentUser: {
    name: '',
    email: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.currentUser = initialState.currentUser;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
