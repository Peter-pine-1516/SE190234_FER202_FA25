//LoginPage.jsx là trang đăng nhập
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect nếu đã đăng nhập
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Nếu đã đăng nhập, không render form
    if (isAuthenticated) {
        return null;
    }

    return <LoginForm />;
};

export default LoginPage;

