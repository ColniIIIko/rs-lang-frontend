import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import AuthHeader from './components/Header/AuthHeader';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Routes, Route } from 'react-router-dom';
import Book from './pages/Book/Book';
import { useAppDispatch } from './redux/hooks';
import { AuthResponse, logout, setFromStorage } from './redux/reducers/auth';
import { fetchIsTokenValid } from './fetchRoutes/fetchAuth';
import { addToken } from './axios/axiosConfig';
import Loader from './components/Loader/Loader';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user') || '') as AuthResponse | null;
      if (user) {
        try {
          const newUser = await fetchIsTokenValid(user);
          if (newUser !== user) {
            localStorage.setItem('user', JSON.stringify(newUser));
            dispatch(setFromStorage(newUser));
            addToken(newUser.token);
          } else {
            dispatch(setFromStorage(user));
            addToken(user.token);
          }
        } catch {
          dispatch(logout());
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
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
