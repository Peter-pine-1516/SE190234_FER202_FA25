import React from 'react';

import { Routes, Route } from 'react-router-dom';


// Import các component cần thiết

import Home from './pages/HomeComponents';

import Products from './pages/Products';

import Contact from './pages/Contact';

import UserProfile from './pages/UserProfile';

import Navigation from './components/Navigation'; // Thanh điều hướng


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
          {/* Route cho trang liên hệ */}
          <Route path="/lien-he" element={<Contact />} />
          {/* Route cho trang user profile */}
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );

}


export default App;