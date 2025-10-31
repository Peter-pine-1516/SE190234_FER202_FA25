// src/components/LoginForm.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import '../css/LoginForm.css';

const ALERT_VARIANT_BY_CODE = {
    IDENTIFIER_NOT_FOUND: 'danger',
    WRONG_PASSWORD: 'danger',
    ACCOUNT_LOCKED: 'warning',
    NETWORK_ERROR: 'danger',
};

function LoginForm({ onLoginSuccess }) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successAccount, setSuccessAccount] = useState(null);

    const { login, loading, clearError } = useAuth();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const pushAlert = (variant, message) => {
        setAlerts([{ id: Date.now(), variant, message }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        clearError();
        setAlerts([]);

        const trimmedIdentifier = identifier.trim();
        const trimmedPassword = password.trim();

        if (!trimmedIdentifier && !trimmedPassword) {
            pushAlert('warning', 'Vui lòng nhập thông tin đăng nhập.');
            return;
        }

        if (!trimmedIdentifier) {
            pushAlert('warning', 'Vui lòng nhập username hoặc email.');
            return;
        }

        if (!trimmedPassword) {
            pushAlert('warning', 'Vui lòng nhập mật khẩu.');
            return;
        }

        const result = await login(trimmedIdentifier, trimmedPassword);

        if (result?.ok) {
            setSuccessAccount(result.account);
            setShowSuccessModal(true);
        } else {
            const variant = ALERT_VARIANT_BY_CODE[result?.code] || 'danger';
            const message = result?.message || 'Đăng nhập thất bại.';
            pushAlert(variant, message);
        }
    };

    const handleReset = () => {
        setIdentifier('');
        setPassword('');
        setAlerts([]);
        clearError();
    };

    const handleConfirmSuccess = () => {
        setShowSuccessModal(false);
        setAlerts([]);
        if (onLoginSuccess && successAccount) {
            onLoginSuccess(successAccount);
        }
    };

    return (
        <Container className="mt-5 login-form-container">
            <div className="login-form-card">
                <h3 className="login-form-title">Đăng Nhập</h3>

                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        variant={alert.variant}
                        onClose={() => setAlerts([])}
                        dismissible
                        className="login-form-alert"
                    >
                        {alert.message}
                    </Alert>
                ))}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="login-form-label">Username hoặc Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={identifier}
                            onChange={(event) => setIdentifier(event.target.value)}
                            placeholder="Nhập username hoặc email"
                            disabled={loading}
                            className="login-form-input"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="login-form-label">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Nhập password"
                            disabled={loading}
                            className="login-form-input"
                        />
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

                    <Alert variant="info" className="mt-3 login-form-demo-alert">
                        <strong>Tài khoản demo:</strong><br />
                        Admin: <strong>admin</strong> / <strong>123456</strong><br />
                        User: <strong>user1</strong> / <strong>123456</strong><br />
                        Locked: <strong>user2</strong> / <strong>123456</strong>
                    </Alert>
                </Form>
            </div>

            <Modal
                show={showSuccessModal}
                onHide={() => {}}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>✅ Đăng nhập thành công!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Chào mừng bạn trở lại, <strong>{successAccount?.username}</strong>!</p>
                    <p className="mb-0">
                        <small className="text-muted">
                            Email: {successAccount?.email}<br />
                            Vai trò: {successAccount?.role}
                        </small>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirmSuccess}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default LoginForm;

