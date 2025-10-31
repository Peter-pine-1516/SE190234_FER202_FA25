// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import movieApi from '../api/movieAPI';

// 1. Tạo Context
const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'lab5_ex1_auth_user';

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
  const [state, dispatch] = useReducer(authReducer, initialState, (initState) => {
    if (typeof window === 'undefined') {
      return initState;
    }

    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return {
          ...initState,
          user: parsedUser,
          isAuthenticated: true,
        };
      }
    } catch (error) {
      console.warn('Không thể đọc thông tin đăng nhập đã lưu:', error);
    }

    return initState;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (state.isAuthenticated && state.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [state.isAuthenticated, state.user]);

  // 6. Hàm đăng nhập - đọc từ db.json qua API
  async function login(identifier, password) {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await movieApi.get("/accounts");
      const accounts = response.data || [];

      const trimmedIdentifier = identifier.trim();
      const isEmail = trimmedIdentifier.includes('@');

      const accountByIdentifier = accounts.find((acc) =>
        isEmail ? acc.email === trimmedIdentifier : acc.username === trimmedIdentifier
      );

      const accountByPassword = accounts.find((acc) => acc.password === password);

      if (!accountByIdentifier) {
        let message;
        if (isEmail) {
          message = 'Email không tồn tại.';
        } else {
          message = accountByPassword ? 'Tài khoản không tồn tại.' : 'Tài khoản không tồn tại.';
        }

        dispatch({ type: 'LOGIN_FAILURE', payload: message });
        return { ok: false, code: 'IDENTIFIER_NOT_FOUND', message };
      }

      if (accountByIdentifier.status === 'locked') {
        const message = 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.';
        dispatch({ type: 'LOGIN_FAILURE', payload: message });
        return { ok: false, code: 'ACCOUNT_LOCKED', message };
      }

      if (accountByIdentifier.password !== password) {
        const message = 'Mật khẩu sai.';
        dispatch({ type: 'LOGIN_FAILURE', payload: message });
        return { ok: false, code: 'WRONG_PASSWORD', message };
      }

      const userInfo = {
        id: accountByIdentifier.id,
        username: accountByIdentifier.username,
        email: accountByIdentifier.email,
        role: accountByIdentifier.role,
        status: accountByIdentifier.status,
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: userInfo });
      return { ok: true, account: userInfo };
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      const message = 'Lỗi kết nối server. Vui lòng thử lại.';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return {
        ok: false,
        code: 'NETWORK_ERROR',
        message,
      };
    }
  }

  // 7. Hàm đăng xuất
  function logout() { 
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
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

