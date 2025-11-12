# Personal Budget Management

## Cài đặt
```bash
npm install
```

## Chạy ứng dụng
```bash
npm start
```
Lệnh trên sử dụng `concurrently` để khởi chạy cả ứng dụng React và JSON Server (port 3001) cùng lúc.

Nếu chỉ muốn chạy JSON Server:
```bash
npm run server
```

## Cấu trúc chính
- `src/contexts/ExpenseContext.jsx`: Quản lý trạng thái chi tiêu với `useReducer` và `Context API`.
- `src/pages/DashboardPage.jsx`: Trang tổng quan hiển thị bộ lọc, biểu mẫu và bảng quản lý chi tiêu.
- `db.json`: Dữ liệu mẫu cho tài khoản và danh sách chi tiêu.