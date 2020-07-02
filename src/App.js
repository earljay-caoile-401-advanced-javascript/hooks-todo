import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToDo from './components/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './styles/base.scss';
import { ListContext } from './components/Settings';

/**
 * main component that holds the 3 main components of the app: Header, ToDo, and Footer
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  const [displayCount, setDisplayCount] = useState(3);

  return (
    <BrowserRouter>
      <Header />
      <ListContext.Provider value={{ displayCount, setDisplayCount }}>
        <ToDo />
      </ListContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
