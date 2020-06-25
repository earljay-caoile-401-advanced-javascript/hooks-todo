import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <ToDo />
      <Footer />
    </>
  );
}

export default App;
