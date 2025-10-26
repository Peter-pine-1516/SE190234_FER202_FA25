import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'vi',
    theme: 'light'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h3>Cài Đặt Hệ Thống</h3>
      <p className="text-muted">
        Quản lý các cài đặt của hệ thống tại đây.
      </p>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Tùy Chọn Cài Đặt</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="notifications">
                    Bật thông báo
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="language" className="form-label">Ngôn Ngữ</label>
                <select
                  className="form-select"
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="theme" className="form-label">Giao Diện</label>
                <select
                  className="form-select"
                  id="theme"
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="auto">Tự động</option>
                </select>
              </div>

              <button className="btn btn-primary">Lưu Cài Đặt</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Trạng Thái Hiện Tại</h6>
            </div>
            <div className="card-body">
              <p><strong>Thông báo:</strong> {settings.notifications ? 'Đã bật' : 'Đã tắt'}</p>
              <p><strong>Ngôn ngữ:</strong> {settings.language}</p>
              <p><strong>Giao diện:</strong> {settings.theme}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <strong>Nested Route:</strong> Trang này được truy cập qua URL /dashboard/settings, 
        được render bên trong DashboardLayout thông qua Outlet.
      </div>
    </div>
  );
}

export default Settings;
