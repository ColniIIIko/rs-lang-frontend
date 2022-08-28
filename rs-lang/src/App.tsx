import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import AuthHeader from './components/Header/AuthHeader';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import Book from './pages/Book/Book';
import { useAppDispatch } from './redux/hooks';
import { AuthResponse, setFromStorage } from './redux/reducers/auth';
import { fetchIsTokenValid } from './fetchRoutes/fetchAuth';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '') as AuthResponse | null;
    if (user) {
      dispatch(setFromStorage(user));
      fetchIsTokenValid(user).then((newUser) => {
        if (user !== newUser) {
          localStorage.setItem('user', JSON.stringify(newUser));
          dispatch(setFromStorage(newUser));
        }
      });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header currentPage='Главная' />
              <Main />
            </>
          }
        />
        <Route
          path='/book'
          element={
            <>
              <Header currentPage='Учебник' />
              <Book />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <AuthHeader />
              <Login />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <AuthHeader />
              <Register />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
