import React, { useReducer } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useToast } from './ToastSignin';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
    identifier: '', // username hoặc email
    password: '',
    errors: {},
    showSuccessModal: false
};

// 2. Định nghĩa reducer cho form
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.message }
            };
        case 'CLEAR_ERROR': {
            const { [action.field]: removed, ...restErrors } = state.errors;
            return {
                ...state,
                errors: restErrors
            };
        }
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors
            };
        case 'SHOW_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: true
            };
        case 'HIDE_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: false
            };
        case 'RESET_FORM':
            return initialFormState;
        default:
            return state;
    }
}

function LoginForm2() {
    // 3. Sử dụng useReducer cho form state
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // 4. Sử dụng AuthContext
    const { login, loading, error, clearError, user } = useAuth();

    // Toast notifications
    const { showToast, ToastComponent } = useToast();

    // 5. Validation helpers
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = (value) => value.includes('@');

    // 6. Xử lý thay đổi input
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Cập nhật giá trị field
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Clear auth error khi user nhập
        clearError();

        // Validation real-time
        if (name === 'identifier') {
            if (!value.trim()) {
                dispatch({
                    type: 'SET_ERROR',
                    field: name,
                    message: 'Username or Email is required.'
                });
            } else if (isEmail(value) && !emailRe.test(value)) {
                dispatch({
                    type: 'SET_ERROR',
                    field: name,
                    message: 'Email is invalid format.'
                });
            } else {
                dispatch({ type: 'CLEAR_ERROR', field: name });
            }
        }

        if (name === 'password') {
            if (!value.trim()) {
                dispatch({
                    type: 'SET_ERROR',
                    field: name,
                    message: 'Password is required.'
                });
            } else {
                dispatch({ type: 'CLEAR_ERROR', field: name });
            }
        }
    };

    // 7. Validation form
    const validateForm = () => {
        const errors = {};

        if (!formState.identifier.trim()) {
            errors.identifier = 'Username or Email is required.';
        } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
            errors.identifier = 'Email is invalid format.';
        }

        if (!formState.password.trim()) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    // 8. Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        clearError();

        // Validate form
        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0) {
            showToast(
                'Vui lòng kiểm tra lại!',
                'Hãy sửa các lỗi được đánh dấu trước khi đăng nhập.',
                'warning'
            );
            return;
        }

        try {
            // Gọi login từ AuthContext
            const result = await login(
                formState.identifier.trim(),
                formState.password
            );

            if (result?.ok) {
                showToast(
                    'Login Successful',
                    result.message || `Welcome, ${result.user?.username}!`,
                    'success'
                );
                dispatch({ type: 'SHOW_SUCCESS_MODAL' });
            } else {
                const message =
                    result?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
                showToast('Login Failed', message, 'danger');
            }
        } catch (err) {
            console.error('Login error:', err);
            showToast(
                'Login Failed',
                'Có lỗi xảy ra trong quá trình đăng nhập.',
                'danger'
            );
        }
    };

    // 9. Xử lý reset form
    const handleReset = () => {
        dispatch({ type: 'RESET_FORM' });
        clearError();
        showToast('Form Reset', 'Biểu mẫu đã được làm mới.', 'info');
    };

    // 10. Xử lý đóng modal thành công
    const handleCloseSuccessModal = () => {
        dispatch({ type: 'HIDE_SUCCESS_MODAL' });
        dispatch({ type: 'RESET_FORM' });
    };

    return (
        <>
            <div style={{ 
                maxWidth: '400px', 
                margin: '40px auto', 
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ 
                    textAlign: 'center', 
                    margin: '0 0 20px 0', 
                    fontSize: '20px',
                    color: '#333'
                }}>
                    User Authentication
                </h3>

                {/* Hiển thị lỗi từ AuthContext */}
                {error && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        color: '#721c24'
                    }}>
                        {error}
                        <button
                            onClick={clearError}
                            style={{
                                float: 'right',
                                background: 'none',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '5px', 
                            fontWeight: '500',
                            color: '#555'
                        }}>
                            Username or Email
                        </label>
                        <input
                            type="text"
                            name="identifier"
                            value={formState.identifier}
                            onChange={handleChange}
                            placeholder="Enter username or email"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: `1px solid ${formState.errors.identifier ? '#dc3545' : '#ddd'}`,
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                        {formState.errors.identifier && (
                            <div style={{ 
                                color: '#dc3545', 
                                fontSize: '12px', 
                                marginTop: '5px' 
                            }}>
                                {formState.errors.identifier}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '5px', 
                            fontWeight: '500',
                            color: '#555'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: `1px solid ${formState.errors.password ? '#dc3545' : '#ddd'}`,
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                        {formState.errors.password && (
                            <div style={{ 
                                color: '#dc3545', 
                                fontSize: '12px', 
                                marginTop: '5px' 
                            }}>
                                {formState.errors.password}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: loading ? '#6c757d' : '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            style={{
                                flex: 1,
                                padding: '12px',
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            Reset
                        </button>
                    </div>

                    <div style={{ 
                        padding: '10px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#6c757d',
                        textAlign: 'center'
                    }}>
                        Demo Accounts:<br />
                        Admin: <strong>admin</strong> / <strong>123456</strong><br />
                        User: <strong>user1</strong> / <strong>123456</strong> (access denied)<br />
                        Locked: <strong>user2</strong> / <strong>123456</strong> (locked account)
                    </div>
                </form>

                {/* Modal thông báo thành công */}
                <ConfirmModal
                    show={formState.showSuccessModal}
                    title="Login Successful"
                    message={`Welcome, ${user?.username}! You have successfully logged in as ${user?.role}.`}
                    onConfirm={handleCloseSuccessModal}
                    onHide={handleCloseSuccessModal}
                    confirmText="Continue"
                    cancelText="Close"
                    variant="success"
                />
            </div>

            {/* Toast notifications */}
            <ToastComponent />
        </>
    );
}

export default LoginForm2;