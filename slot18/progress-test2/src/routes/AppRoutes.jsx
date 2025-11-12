//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx"; // Import useAuth
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AddPaymentPage from "../pages/AddPaymentPage.jsx";
import ViewPaymentDetailsPage from "../pages/ViewPaymentDetailsPage.jsx";
import EditPaymentPage from "../pages/EditPaymentPage.jsx";
import UserList from "../pages/UserList.jsx";
import ViewUserDetail from "../pages/ViewUserDetail.jsx";

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children }) => {
  // Lấy trực tiếp isAuthenticated từ useAuth()
  const { isAuthenticated } = useAuth();

  // Nếu chưa đăng nhập, chuyển hướng đến /login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
        <Route path="/" element={<Navigate to="/home" replace />} />

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

        {/* 4. Route để thêm payment mới */}
        <Route
          path="/payments/add"
          element={
            <PrivateRoute>
              <AddPaymentPage />
            </PrivateRoute>
          }
        />

        {/* 5. Route để xem chi tiết payment */}
        <Route
          path="/payments/:id"
          element={
            <PrivateRoute>
              <ViewPaymentDetailsPage />
            </PrivateRoute>
          }
        />

        {/* 6. Route để chỉnh sửa payment */}
        <Route
          path="/payments/:id/edit"
          element={
            <PrivateRoute>
              <EditPaymentPage />
            </PrivateRoute>
          }
        />

        {/* 7. Route để xem danh sách user */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        {/* 8. Route để xem chi tiết user */}
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <ViewUserDetail />
            </PrivateRoute>
          }
        />

        {/* 9. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
