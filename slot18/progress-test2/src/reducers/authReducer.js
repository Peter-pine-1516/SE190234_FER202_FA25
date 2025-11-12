// authReducer.js - Quản lý reducer cho authentication

// Khai báo Trạng thái khởi tạo Initial State
export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// Tạo hàm reducer để quản lý các hành động liên quan đến xác thực
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      // Lưu user vào Local Storage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      // Lỗi từ server/invalid credentials
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      // Xóa user khỏi Local Storage
      localStorage.removeItem("user");
      // Trở về trạng thái ban đầu, nhưng giữ lại các trường hợp ngoại lệ nếu có
      return { ...initialAuthState, isAuthenticated: false, user: null };
    case "CLEAR_ERROR":
      // Thêm action này để LoginForm có thể xóa lỗi Auth khi người dùng nhập
      return { ...state, error: null };
    default:
      return state;
  }
};

