//AddexpensesPage.jsx là trang thêm thanh toán mới
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const AddexpensesPage = () => {
    const { createexpenses, isLoading, error } = useExpenses();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Default to today
    });
    
    const [validationErrors, setValidationErrors] = useState({});

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
        
        if (!formData.name.trim()) {
            errors.name = 'name là bắt buộc';
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
            const expensesData = {
                ...formData,
                amount: parseFloat(formData.amount),
            };
            
            await createexpenses(expensesData);
            navigate('/home');
        } catch (error) {
            console.error('Error creating expenses:', error);
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Header as="h5">Thêm Thanh Toán Mới</Card.Header>
                    <Card.Body>
                        {error && (
                            <Alert variant="danger" className="mb-3">
                                {error}
                            </Alert>
                        )}
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>name <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Fall 2025"
                                    isInvalid={!!validationErrors.name}
                                />
                                {validationErrors.name && (
                                    <Form.Text className="text-danger">
                                        {validationErrors.name}
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
                                    {isLoading ? 'Đang lưu...' : 'Thêm Thanh Toán'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AddexpensesPage;

