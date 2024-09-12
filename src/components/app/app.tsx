import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppWrapper } from '../app-wrapper';
import { ConstructorPage, Feed, Profile } from '@pages';
import { IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<AppWrapper />}>
          <Route path='' element={<ConstructorPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:id' element={<OrderInfo />} />
          <Route path='/profile' element={<Profile />} />
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
