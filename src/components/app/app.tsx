import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppWrapper } from '../app-wrapper';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { OnlyUnAuth, PrivateRoute } from '../protected-route/private-route';
import { useGetUserQuery } from '../../services/api/burgersApi';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { setUser } from '@slices';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;
  const { data: user } = useGetUserQuery();
  const { currentUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Если нет токенов, то пользователь не авторизован
    if (!accessToken || !refreshToken) return;

    // Если пользователь авторизован, то получаем данные юзера
    if (user && !currentUser.name) {
      dispatch(setUser(user));
    }
  }, [user, currentUser]);

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<AppWrapper />}>
          <Route path='' element={<ConstructorPage />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />
          <Route path='feed' element={<Feed />} />
          <Route path='feed/:id' element={<OrderInfo />} />
          <Route path='login' element={<OnlyUnAuth children={<Login />} />} />
          <Route
            path='register'
            element={<OnlyUnAuth children={<Register />} />}
          />
          <Route
            path='forgot-password'
            element={<OnlyUnAuth children={<ForgotPassword />} />}
          />
          <Route
            path='reset-password'
            element={<OnlyUnAuth children={<ResetPassword />} />}
          />
          <Route
            path='profile'
            element={<PrivateRoute children={<Profile />} />}
          />
          <Route
            path='profile/orders'
            element={<PrivateRoute children={<ProfileOrders />} />}
          />
          <Route
            path='profile/orders/:id'
            element={<PrivateRoute children={<OrderInfo />} />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
export default App;
