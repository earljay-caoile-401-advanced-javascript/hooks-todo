import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToDo />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
