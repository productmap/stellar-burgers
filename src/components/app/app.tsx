import { Route, Routes, useLocation } from 'react-router-dom';
import { AppWrapper } from '../app-wrapper';
import { ConstructorPage, Feed, Profile } from '@pages';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Routes location={background || location}>
      <Route path='/' element={<AppWrapper />}>
        <Route path='' element={<ConstructorPage />} />
        <Route path='feed' element={<Feed />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
