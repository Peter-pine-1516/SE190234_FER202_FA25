import React from 'react';

import { Routes, Route } from 'react-router-dom';


// Import các component cần thiết
import Home from './pages/HomeComponents';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import Navigation from './components/Navigation'; // Thanh điều hướng

// Import Dashboard components
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Settings from './pages/Settings';
import Reports from './pages/Reports';


function App() {

  return (
    <>
      <Navigation /> {/* Hiển thị thanh điều hướng ở mọi nơi */}
      <div className="container">
        <Routes>
          {/* Route cho trang chủ */}
          <Route path="/" element={<Home />} />
          {/* Route cho trang sản phẩm */}
          <Route path="/san-pham" element={<Products />} />
          {/* Route động cho chi tiết sản phẩm */}
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          {/* Route cho trang liên hệ */}
          <Route path="/lien-he" element={<Contact />} />
          {/* Route cho trang user profile */}
          <Route path="/users/:id" element={<UserProfile />} />

          {/* Nested Routes cho Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Index route - hiển thị khi truy cập /dashboard */}
            <Route index element={<DashboardHome />} />
            {/* Nested route con - /dashboard/settings */}
            <Route path="settings" element={<Settings />} />
            {/* Nested route con - /dashboard/reports */}
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </div>
    </>
  );

}


export default App;