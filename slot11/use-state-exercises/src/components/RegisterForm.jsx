//RegisterForm component using useState for registration form with validation
import React, { useState } from 'react';
import { Form, Button, Card, Modal, Toast } from 'react-bootstrap';
import './RegisterForm.css';

function RegisterForm() {
    //State cho form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    //State cho validation errors
    const [errors, setErrors] = useState({});

    //State cho toast
    const [showToast, setShowToast] = useState(false);

    //State cho modal
    const [showModal, setShowModal] = useState(false);

    //Validation functions
    const validateUsername = (username) => {
        if (!username.trim()) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (username !== username.trim()) return 'Username cannot have leading/trailing spaces';
        if (!/^[a-zA-Z0-9._]+$/.test(username)) return 'Username can only contain letters, numbers, _ or .';
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
        if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) return 'Password must contain at least one special character';
        return '';
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return 'Please confirm your password';
        if (password !== confirmPassword) return 'Passwords do not match';
        return '';
    };

    //Validate all fields
    const validateForm = () => {
        const newErrors = {};
        
        newErrors.username = validateUsername(formData.username);
        newErrors.email = validateEmail(formData.email);
        newErrors.password = validatePassword(formData.password);
        newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
        
        //Remove empty error messages
        Object.keys(newErrors).forEach(key => {
            if (newErrors[key] === '') {
                delete newErrors[key];
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //Check if form is valid for submit button
    const isFormValid = () => {
        return formData.username.trim() && 
               formData.email.trim() && 
               formData.password && 
               formData.confirmPassword &&
               Object.keys(errors).length === 0 &&
               validateUsername(formData.username) === '' &&
               validateEmail(formData.email) === '' &&
               validatePassword(formData.password) === '' &&
               validateConfirmPassword(formData.password, formData.confirmPassword) === '';
    };

    //Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        //Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    //Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setShowToast(true);
            setShowModal(true);
        }
    };

    //Handle cancel button
    const handleCancel = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    //Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Form Đăng Ký Tài Khoản</h2>
            
            <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                        isInvalid={!!errors.username}
                        className="form-control"
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        isInvalid={!!errors.email}
                        className="form-control"
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        isInvalid={!!errors.password}
                        className="form-control"
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                        isInvalid={!!errors.confirmPassword}
                        className="form-control"
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="button-group">
                    <Button 
                        type="submit" 
                        variant="primary"
                        disabled={!isFormValid()}
                        className="btn btn-primary"
                    >
                        Submit
                    </Button>
                    <Button 
                        type="button" 
                        variant="secondary"
                        onClick={handleCancel}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </Button>
                </div>
            </Form>

            {/* Toast Notification */}
            <div className="toast-container">
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)}
                    className="toast"
                >
                    <Toast.Header className="toast-header">
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="toast-body">Submitted successfully!</Toast.Body>
                </Toast>
            </div>

            {/* Modal hiển thị thông tin đã submit */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Content className="modal-content">
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title className="modal-title">Đăng Ký Thành Công!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <Card className="card">
                            <Card.Header className="card-header">
                                <h5>Thông Tin Đã Đăng Ký</h5>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <p><strong>Username:</strong> {formData.username}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Password:</strong> {'*'.repeat(formData.password.length)}</p>
                                <p><strong>Confirm Password:</strong> {'*'.repeat(formData.confirmPassword.length)}</p>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button variant="primary" onClick={handleCloseModal} className="btn btn-primary">
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default RegisterForm;
