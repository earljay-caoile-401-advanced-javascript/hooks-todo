import React from 'react';
// import Nav from './Nav';
import '../styles/header.scss';

/**
 * Simple header content that shows up on every page. Contains title and nav bar
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header() {
  return (
    <header id="main-header">
      <h1>ToDo List</h1>
    </header>
  );
}

export default Header;
