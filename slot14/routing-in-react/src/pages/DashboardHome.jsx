import React from 'react';

function DashboardHome() {
  return (
    <div>
      <h3>Trang Chủ Dashboard</h3>
      <p className="text-muted">
        Đây là trang chủ của Dashboard quản trị. Tại đây bạn có thể xem tổng quan về hệ thống.
      </p>
      
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tổng Người Dùng</h5>
              <h2 className="text-primary">1,234</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tổng Đơn Hàng</h5>
              <h2 className="text-success">567</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Doanh Thu</h5>
              <h2 className="text-info">12.5M VNĐ</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Chú ý:</strong> Đây là route con sử dụng index route. Khi truy cập /dashboard, 
        component này sẽ được render bên trong DashboardLayout thông qua Outlet.
      </div>
    </div>
  );
}

export default DashboardHome;
