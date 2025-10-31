// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand>🎬 Movie Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated && user ? (
                            <>
                                <Navbar.Text className="me-3">
                                    <strong>Xin chào, {user.username}!</strong>
                                    <br />
                                    <small className="text-muted">
                                        {user.email} ({user.role})
                                    </small>
                                </Navbar.Text>
                                <Button 
                                    variant="outline-light" 
                                    onClick={handleLogout}
                                >
                                    Đăng Xuất
                                </Button>
                            </>
                        ) : (
                            <Navbar.Text className="text-muted">
                                Chưa đăng nhập
                            </Navbar.Text>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

