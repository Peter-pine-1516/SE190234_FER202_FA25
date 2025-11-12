//PaymentDetailsPage.jsx là trang xem chi tiết thanh toán
import React, { useEffect } from 'react';
import { Container, Card, Button, Badge, Row, Col, Alert, ListGroup } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';

const PaymentDetailsPage = () => {
    const { selectedPayment, fetchPaymentById, isLoading, error } = usePayment();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchPaymentById(id);
        }
    }, [id, fetchPaymentById]);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleEdit = () => {
        navigate(`/payments/${id}/edit`);
    };

    const handleBack = () => {
        navigate('/home');
    };

    if (isLoading) {
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

    if (error || !selectedPayment) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <Card>
                        <Card.Body>
                            <Alert variant="danger">
                                {error || 'Không tìm thấy thanh toán này.'}
                            </Alert>
                            <Button variant="secondary" onClick={handleBack}>
                                Quay lại
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title as="h5" className="mb-0">
                            Chi Tiết Thanh Toán
                        </Card.Title>
                        <div>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button variant="secondary" onClick={handleBack}>
                                Back to List
                            </Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={8} lg={6} className="mx-auto">
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <strong>ID:</strong>
                                        <span className="text-muted">{selectedPayment.id}</span>
                                    </ListGroup.Item>
                                    
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <strong>Semester:</strong>
                                        <Badge bg="primary">{selectedPayment.semester}</Badge>
                                    </ListGroup.Item>
                                    
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <strong>Course Name:</strong>
                                        <span className="text-muted">{selectedPayment.courseName}</span>
                                    </ListGroup.Item>
                                    
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <strong>Date:</strong>
                                        <span className="text-muted">{formatDate(selectedPayment.date)}</span>
                                    </ListGroup.Item>
                                    
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <strong>Amount:</strong>
                                        <Badge bg="success" className="fs-6 px-3 py-2">
                                            {formatAmount(selectedPayment.amount)}
                                        </Badge>
                                    </ListGroup.Item>
                                    
                                    {selectedPayment.userId && (
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <strong>User ID:</strong>
                                            <span className="text-muted">{selectedPayment.userId}</span>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default PaymentDetailsPage;

