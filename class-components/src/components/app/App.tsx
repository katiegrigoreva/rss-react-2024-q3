import Header from '../header/Header';
import Main from '../pages/mainPage/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import './app.css';
import HeroInfo from '../heroInfo/HeroInfo';

const App = () => {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="details/:id" element={<HeroInfo />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
