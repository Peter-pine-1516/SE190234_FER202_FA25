import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo/Brand */}
        <NavLink className="navbar-brand" to="/">
          <strong>React Router App</strong>
        </NavLink>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/"
              >
                Trang Chủ
              </NavLink>
            </li>

            {/* Products Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/san-pham"
              >
                Sản Phẩm
              </NavLink>
            </li>

            {/* Contact Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/lien-he"
              >
                Liên Hệ
              </NavLink>
            </li>

            {/* User Profile Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/users/123"
              >
                User Profile
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;