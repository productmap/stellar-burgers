import { TIngredient, TOrder, TUser } from '@utils-types';

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;
export type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TFeedsResponse = TServerResponse<{
  // data: feeds = { orders: [] },
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export type TOrdersResponse = TServerResponse<{
  // data: orders = { data: [] },
  data: TOrder[];
}>;

export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TLoginResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TLoginData = {
  email: string;
  password: string;
};

export type TUserResponse = TServerResponse<{ user: TUser }>;

export type CustomError = Error & {
  data: {
    message: string;
  };
};
