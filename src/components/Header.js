import React from 'react';
import '../styles/header.scss';
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  Button,
  FormControl,
} from 'react-bootstrap';

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
    { displayName: 'Home', url: '/' },
    { displayName: 'Tasks', url: '/tasks' },
  ];

  const navLinks = [];

  for (let i = 0; i < links.length; i++) {
    navLinks.push(
      <Nav.Link key={i} href={links[i].url}>
        {links[i].displayName}
      </Nav.Link>
    );
  }

  return (
    <Navbar id="main-header" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <h1>ToDo List</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {navLinks}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
