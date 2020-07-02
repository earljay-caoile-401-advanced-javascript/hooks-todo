import React, { useState } from 'react';
import '../styles/header.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
  const links = [
    { displayName: 'Form', url: '/' },
    { displayName: 'Tasks', url: '/tasks' },
  ];

  const navLinks = [];

  const [expanded, setExpanded] = useState(false);

  for (let i = 0; i < links.length; i++) {
    navLinks.push(
      <Link
        className="nav-link"
        key={i}
        to={links[i].url}
        onClick={() => setTimeout(() => setExpanded(false), 100)}
      >
        {links[i].displayName}
      </Link>
    );
  }

  return (
    <>
      <Navbar id="main-header" variant="dark" expand="md" expanded={expanded}>
        <Navbar.Brand>
          <h1>ToDo List</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <>{navLinks}</>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
