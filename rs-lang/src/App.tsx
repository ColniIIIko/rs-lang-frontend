import React from 'react';
import Footer from './components/Footer/Footer';
import AuthHeader from './components/Header/AuthHeader';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
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
