// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const fullName = user?.fullName || user?.username || 'Student';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center gap-2">
                    <img
                        src="/images/logo.png"
                        alt="PersonalBudget logo"
                        width={32}
                        height={32}
                        className="rounded-circle"
                    />
                    <span className="fw-semibold">PersonalBudget</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-3">
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{fullName}</strong>
                        </Navbar.Text>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavigationHeader;
