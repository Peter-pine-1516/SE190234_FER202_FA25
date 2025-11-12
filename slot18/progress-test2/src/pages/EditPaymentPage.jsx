//EditexpensesPage.jsx là trang chỉnh sửa thanh toán
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const EditexpensesPage = () => {
    const { selectedexpenses, fetchexpensesById, updateexpenses, isLoading, error } = useExpenses();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        name: '',
        courseName: '',
        amount: '',
        date: '',
    });
    
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (id) {
            fetchexpensesById(id);
        }
    }, [id, fetchexpensesById]);

    useEffect(() => {
        if (selectedexpenses) {
            setFormData({
                name: selectedexpenses.name || '',
                courseName: selectedexpenses.courseName || '',
                amount: selectedexpenses.amount?.toString() || '',
                date: selectedexpenses.date || '',
            });
        }
    }, [selectedexpenses]);

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
                ...selectedexpenses,
                ...formData,
                amount: parseFloat(formData.amount),
            };
            
            await updateexpenses(id, expensesData);
            navigate(`/expensess/${id}`);
        } catch (error) {
            console.error('Error updating expenses:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/expensess/${id}`);
    };

    if (isLoading && !selectedexpenses) {
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

export default EditexpensesPage;

