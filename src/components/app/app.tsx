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
import { useCheckAuth } from '../../hooks/useCheckAuth';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useCheckAuth();

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
          {/*<Route path='profile/orders/:id' element={<OrderInfo />} />*/}
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
