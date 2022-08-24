import React from 'react';
import Footer from './components/Footer/Footer';
import AuthHeader from './components/Header/AuthHeader';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Register from './pages/Auth/Register';

function App() {
  return (
    <>
      <AuthHeader />
      {/* <Main /> */}
      <Register />
      <Footer />
    </>
  );
}

export default App;
