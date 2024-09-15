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
import { PrivateRoute } from '../protected-route/private-route';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<AppWrapper />}>
          <Route path='' element={<ConstructorPage />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />
          <Route path='feed' element={<Feed />} />
          <Route path='feed/:id' element={<OrderInfo />} />
          <Route
            path='login'
            element={<PrivateRoute children={<Login />} onlyUnAuth />}
          />
          <Route
            path='register'
            element={<PrivateRoute children={<Register />} onlyUnAuth />}
          />
          <Route
            path='forgot-password'
            element={<PrivateRoute children={<ForgotPassword />} onlyUnAuth />}
          />
          <Route
            path='reset-password'
            element={<PrivateRoute children={<ResetPassword />} onlyUnAuth />}
          />
          <Route
            path='profile'
            element={<PrivateRoute children={<Profile />} />}
          />
          <Route
            path='profile/orders'
            element={<PrivateRoute children={<ProfileOrders />} />}
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
        </Routes>
      )}
    </>
  );
};
export default App;
