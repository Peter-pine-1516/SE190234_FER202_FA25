//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPaymentPage from '../pages/AddPaymentPage';
import PaymentDetailsPage from '../pages/PaymentDetailsPage';
import EditPaymentPage from '../pages/EditPaymentPage';
import UserListPage from '../pages/UserListPage'; 

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
    // Lấy trực tiếp isAuthenticated từ useAuth()
    const { isAuthenticated } = useAuth(); 
    
    // Nếu chưa đăng nhập, chuyển hướng đến /login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Component để redirect dựa trên authentication status
const HomeRedirect = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<HomeRedirect />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Payment Routes */}
                <Route 
                    path="/payments/add" 
                    element={
                        <PrivateRoute>
                            <AddPaymentPage />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/payments/:id" 
                    element={
                        <PrivateRoute>
                            <PaymentDetailsPage />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/payments/:id/edit" 
                    element={
                        <PrivateRoute>
                            <EditPaymentPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 5. User Management Route */}
                <Route 
                    path="/users" 
                    element={
                        <PrivateRoute>
                            <UserListPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 6. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
