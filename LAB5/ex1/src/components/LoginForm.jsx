// src/components/LoginForm.jsx
import React, { useReducer, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
    identifier: '', // username hoặc email
    password: '',
    errors: {},
    validated: false
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
                errors: action.errors,
                validated: true
            };
        case 'RESET_FORM':
            return initialFormState;
        default:
            return state;
    }
}

function LoginForm({ onLoginSuccess }) {
    // 3. Sử dụng useReducer cho form state
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // 4. Sử dụng AuthContext
    const { login, loading, error, clearError } = useAuth();

    // 5. Validation helpers
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = (value) => value.includes('@');

    // 6. Clear auth error khi component mount
    useEffect(() => {
        clearError();
    }, [clearError]);

    // 7. Xử lý thay đổi input
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Cập nhật giá trị field
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Clear auth error khi user nhập
        clearError();

        // Clear field error
        if (formState.errors[name]) {
            dispatch({ type: 'CLEAR_ERROR', field: name });
        }
    };

    // 8. Validation form
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

    // 9. Xử lý submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        clearError();

        // Validate form
        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            // Gọi login từ AuthContext
            const result = await login(
                formState.identifier.trim(),
                formState.password
            );

            if (result?.ok) {
                // Đăng nhập thành công - gọi callback để chuyển hướng
                if (onLoginSuccess) {
                    onLoginSuccess(result.account);
                }
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    // 10. Xử lý reset form
    const handleReset = () => {
        dispatch({ type: 'RESET_FORM' });
        clearError();
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <div style={{
                padding: '30px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ 
                    textAlign: 'center', 
                    marginBottom: '30px',
                    color: '#333'
                }}>
                    Đăng Nhập
                </h3>

                {/* Hiển thị lỗi từ AuthContext */}
                {error && (
                    <Alert variant="danger" onClose={clearError} dismissible>
                        {error}
                    </Alert>
                )}

                <Form noValidate validated={formState.validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username hoặc Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="identifier"
                            value={formState.identifier}
                            onChange={handleChange}
                            placeholder="Nhập username hoặc email"
                            disabled={loading}
                            isInvalid={!!formState.errors.identifier}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formState.errors.identifier}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            placeholder="Nhập password"
                            disabled={loading}
                            isInvalid={!!formState.errors.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formState.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2 mb-3">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="flex-fill"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            disabled={loading}
                            className="flex-fill"
                        >
                            Reset
                        </Button>
                    </div>

                    <Alert variant="info" className="mt-3" style={{ fontSize: '12px' }}>
                        <strong>Tài khoản demo:</strong><br />
                        Admin: <strong>admin</strong> / <strong>123456</strong><br />
                        User: <strong>user1</strong> / <strong>123456</strong><br />
                        Locked: <strong>user2</strong> / <strong>123456</strong>
                    </Alert>
                </Form>
            </div>
        </Container>
    );
}

export default LoginForm;

