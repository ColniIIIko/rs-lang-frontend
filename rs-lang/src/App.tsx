import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';

function App() {
  return (
    <>
      <Header currentPage='Главная' />
      <Main />
      <Footer />
    </>
  );
}

export default App;

