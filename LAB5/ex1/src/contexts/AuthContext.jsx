// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext } from 'react';
import movieApi from '../api/movieAPI';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khởi tạo trạng thái ban đầu
const initialState = { 
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// 3. Định nghĩa hàm reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        loading: false, 
        error: null,
        isAuthenticated: true
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: action.payload,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        loading: false, 
        error: null,
        isAuthenticated: false
      };
    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: null 
      };
    default: 
      return state;
  }
}

// 4. Tạo Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 6. Hàm đăng nhập - đọc từ db.json qua API
  async function login(identifier, password) {
    // Bắt đầu quá trình đăng nhập
    dispatch({ type: 'LOGIN_START' });

    try {
      // Đọc danh sách accounts từ db.json
      const response = await movieApi.get("/accounts");
      const accounts = response.data;

      const isEmail = identifier.includes('@');
      
      // Tìm kiếm tài khoản theo email hoặc username
      const account = accounts.find(acc => {
        if (isEmail) {
          return acc.email === identifier && acc.password === password;
        } else {
          return acc.username === identifier && acc.password === password;
        }
      });

      if (!account) {
        // Không tìm thấy tài khoản hoặc sai mật khẩu
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Invalid credentials.' 
        });
        return { ok: false, message: 'Invalid credentials.' };
      }

      // Kiểm tra trạng thái tài khoản
      if (account.status === 'locked') {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Account is locked. Please contact administrator.' 
        });
        return { ok: false, message: 'Account is locked. Please contact administrator.' };
      }

      // Đăng nhập thành công
      const userInfo = {
        id: account.id,
        username: account.username,
        email: account.email,
        role: account.role,
        status: account.status
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo });
      return { ok: true, account: userInfo };
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Error connecting to server. Please try again.' 
      });
      return { ok: false, message: 'Error connecting to server. Please try again.' };
    }
  }

  // 7. Hàm đăng xuất
  function logout() { 
    dispatch({ type: 'LOGOUT' }); 
  }

  // 8. Hàm xóa lỗi
  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

  // 9. Giá trị context
  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 10. Custom hook để sử dụng AuthContext
export function useAuth() { 
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

