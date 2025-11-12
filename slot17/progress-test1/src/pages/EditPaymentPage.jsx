//EditPaymentPage.jsx là trang chỉnh sửa thanh toán
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const EditPaymentPage = () => {
    const { selectedPayment, fetchPaymentById, updatePayment, isLoading, error } = usePayment();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: '',
    });
    
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (id) {
            fetchPaymentById(id);
        }
    }, [id, fetchPaymentById]);

    useEffect(() => {
        if (selectedPayment) {
            setFormData({
                semester: selectedPayment.semester || '',
                courseName: selectedPayment.courseName || '',
                amount: selectedPayment.amount?.toString() || '',
                date: selectedPayment.date || '',
            });
        }
    }, [selectedPayment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.semester.trim()) {
            errors.semester = 'Semester là bắt buộc';
        }
        
        if (!formData.courseName.trim()) {
            errors.courseName = 'Course name là bắt buộc';
        }
        
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            errors.amount = 'Amount phải lớn hơn 0';
        }
        
        if (!formData.date) {
            errors.date = 'Date là bắt buộc';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const paymentData = {
                ...selectedPayment,
                ...formData,
                amount: parseFloat(formData.amount),
            };
            
            await updatePayment(id, paymentData);
            navigate(`/payments/${id}`);
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/payments/${id}`);
    };

    if (isLoading && !selectedPayment) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="text-center py-5">
                        <p>Đang tải...</p>
                    </div>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Header as="h5">Chỉnh Sửa Thanh Toán</Card.Header>
                    <Card.Body>
                        {error && (
                            <Alert variant="danger" className="mb-3">
                                {error}
                            </Alert>
                        )}
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Semester <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Fall 2025"
                                    isInvalid={!!validationErrors.semester}
                                />
                                {validationErrors.semester && (
                                    <Form.Text className="text-danger">
                                        {validationErrors.semester}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Course Name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="courseName"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Web Development"
                                    isInvalid={!!validationErrors.courseName}
                                />
                                {validationErrors.courseName && (
                                    <Form.Text className="text-danger">
                                        {validationErrors.courseName}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Amount (VND) <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 3500000"
                                    min="0"
                                    step="1000"
                                    isInvalid={!!validationErrors.amount}
                                />
                                {validationErrors.amount && (
                                    <Form.Text className="text-danger">
                                        {validationErrors.amount}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    isInvalid={!!validationErrors.date}
                                />
                                {validationErrors.date && (
                                    <Form.Text className="text-danger">
                                        {validationErrors.date}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <div className="d-flex justify-content-end gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Đang lưu...' : 'Cập Nhật'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default EditPaymentPage;

