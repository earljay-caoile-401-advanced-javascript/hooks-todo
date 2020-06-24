import React from 'react';
// import Nav from './Nav';

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
  // const links = [
  //   { displayName: 'Home', url: '/' },
  //   { displayName: 'History', url: '/history' },
  // ];

  return (
    <header>
      <h1>RESTy</h1>
      {/* <Nav links={links} className="top-navbar" /> */}
    </header>
  );
}

export default Header;
