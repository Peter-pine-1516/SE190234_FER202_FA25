import React from 'react';
import { Navbar, Nav, Form, Button, Container, InputGroup, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-film me-2"></i>
          Movie App
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              <i className="bi bi-house-door me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              <i className="bi bi-envelope me-1"></i>
              Contact
            </Nav.Link>
          </Nav>

          {/* Quick Search Form */}
          <Form className="d-flex me-3">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Quick search"
                aria-label="Search"
                size="sm"
              />
              <Button variant="outline-light" size="sm">
                <i className="bi bi-search"></i> Search
              </Button>
            </InputGroup>
          </Form>

          {/* User Actions */}
          <Nav>
            {/* Accounts Dropdown */}
            <NavDropdown 
              title={
                <>
                  <i className="bi bi-person-circle me-1"></i>
                  Accounts
                </>
              } 
              id="accounts-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#manage-profiles">
                <i className="bi bi-people me-2"></i>
                Manage Your Profiles
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/build-account">
                <i className="bi bi-person-plus me-2"></i>
                Build your Account
              </NavDropdown.Item>
              <NavDropdown.Item href="#change-password">
                <i className="bi bi-key me-2"></i>
                Change Password
              </NavDropdown.Item>
            </NavDropdown>

            {/* Login */}
            <Nav.Link href="#login">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Nav.Link>

            {/* Favourites */}
            <Nav.Link href="#favourites">
              <i className="bi bi-heart me-1"></i>
              Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

