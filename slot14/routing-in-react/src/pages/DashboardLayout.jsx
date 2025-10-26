import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h2 className="mb-0">Dashboard Quản Trị</h2>
            </div>
            <div className="card-body">
              {/* Navigation cho các trang con */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <NavLink 
                    to="/dashboard" 
                    end
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Trang Chủ Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/dashboard/settings" 
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Cài Đặt
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/dashboard/reports" 
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Báo Cáo
                  </NavLink>
                </li>
              </ul>

              {/* Outlet để render các route con */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
