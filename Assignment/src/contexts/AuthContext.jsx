//AuthContext.jsx quản lý xác thực người dùng bằng Context API và useReducer
import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State - Load từ localStorage nếu có
const getInitialState = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            return {
                isAuthenticated: true,
                user: user,
                isLoading: false,
                error: null,
            };
        } catch (error) {
            localStorage.removeItem('user');
            return {
                isAuthenticated: false,
                user: null,
                isLoading: false,
                error: null,
            };
        }
    }
    return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
    };
};

const initialAuthState = getInitialState();

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến xác thực
const authReducer = (state, action) => {
    switch (action.type) { 
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            // Lưu user vào Local Storage
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            // Lỗi từ server/invalid credentials
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT':
            // Xóa user khỏi Local Storage
            localStorage.removeItem('user');
            // Trở về trạng thái ban đầu
            return {
                isAuthenticated: false,
                user: null,
                isLoading: false,
                error: null,
            };
        case 'CLEAR_ERROR':
            // Thêm action này để LoginForm có thể xóa lỗi Auth khi người dùng nhập
            return { ...state, error: null };
        case 'LOAD_USER':
            // Load user từ localStorage (dùng khi refresh)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

// 4. Tạo AuthProvider để cung cấp Context cho các component con
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    // Hàm action để xóa lỗi
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Hàm login nhận usernameOrEmail (identifier) và password
    const login = async ({ username, password }) => {
        dispatch({ type: 'LOGIN_START' });
        
        try {
            // 1. Gọi API để đăng nhập và lấy thông tin user từ file db.json
            const accounts = await api.getUsers(); // Giả định getUsers() lấy tất cả users
            
            // 2. SỬA LỖI: Kiểm tra thông tin đăng nhập bằng username HOẶC email (identifier)
            const user = accounts.find(
                (acc) =>
                    acc.username === username &&
                    acc.password === password
            );

            // 3. Cập nhật trạng thái dựa trên kết quả đăng nhập
            if (user) { 
                // Kiểm tra role và status: Chỉ cho phép admin với status active
                // if (user.role !== 'admin') {
                //     const errorMessage = 'Bạn không có quyền truy cập.';
                //     dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                //     return { success: false, error: errorMessage };
                // }
                
                // if (user.status !== 'active') {
                //     const errorMessage = 'Tài khoản bị khóa, bạn không có quyền truy cập.';
                //     dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                //     return { success: false, error: errorMessage };
                // }
                
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                // Trả về kết quả thành công cho LoginForm
                return { success: true, user };
            } else { 
                // Đăng nhập thất bại (Invalid username/email hoặc password)
                const errorMessage = 'Invalid username or password!';
                dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
                return { success: false, error: errorMessage };
            }
        } catch (error) {
            // Lỗi mạng hoặc lỗi không xác định từ API
            const errorMessage = error.message || 'Login failed due to a network error.';
            dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    // 4. Cung cấp trực tiếp các giá trị cần thiết qua Context value
    const contextValue = {
        // Trạng thái từ Reducer
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        
        // Actions
        login,
        logout,
        clearError, // Thêm hàm clearError để LoginForm có thể sử dụng
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => useContext(AuthContext);
