import React from 'react';

function Reports() {
  const reports = [
    { id: 1, title: "Báo Cáo Doanh Thu Tháng 12", date: "2024-12-31", status: "Đã hoàn thành" },
    { id: 2, title: "Báo Cáo Người Dùng Mới", date: "2024-12-30", status: "Đã hoàn thành" },
    { id: 3, title: "Phân Tích Xu Hướng Bán Hàng", date: "2024-12-29", status: "Đang xử lý" },
  ];

  return (
    <div>
      <h3>Báo Cáo và Phân Tích</h3>
      <p className="text-muted">
        Xem và quản lý các báo cáo của hệ thống.
      </p>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Danh Sách Báo Cáo</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tiêu Đề</th>
                      <th>Ngày Tạo</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(report => (
                      <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.title}</td>
                        <td>{report.date}</td>
                        <td>
                          <span className={`badge ${
                            report.status === 'Đã hoàn thành' ? 'bg-success' : 'bg-warning'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">Xem</button>
                          <button className="btn btn-sm btn-secondary ms-2">Tải xuống</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thống Kê Nhanh</h5>
              <p className="card-text">
                <small className="text-muted">Tổng số báo cáo: {reports.length}</small>
              </p>
              <button className="btn btn-outline-primary">Tạo Báo Cáo Mới</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Xuất Dữ Liệu</h5>
              <div className="btn-group-vertical w-100">
                <button className="btn btn-outline-success mb-2">Xuất Excel</button>
                <button className="btn btn-outline-danger">Xuất PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Nested Route:</strong> Trang này được truy cập qua URL /dashboard/reports, 
        được render bên trong DashboardLayout thông qua Outlet. 
        Tất cả các trang trong dashboard đều chia sẻ cùng một layout và navigation.
      </div>
    </div>
  );
}

export default Reports;
