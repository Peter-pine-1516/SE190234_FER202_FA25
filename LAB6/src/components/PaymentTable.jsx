//PaymentTable.jsx hiển thị danh sách payments dưới dạng bảng
import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deletePaymentAsync, selectPaymentsState } from '../features/payments/paymentsSlice';

const PaymentTable = ({ filteredPayments }) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(selectPaymentsState);
    const navigate = useNavigate();
    
    // Use filteredPayments if provided, otherwise fallback to all payments
    const payments = filteredPayments || [];
    
    // State for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);

    const handleViewDetails = (payment) => {
        navigate(`/payments/${payment.id}`);
    };

    const handleEdit = (payment) => {
        navigate(`/payments/${payment.id}/edit`);
    };

    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (paymentToDelete) {
            try {
                await dispatch(deletePaymentAsync(paymentToDelete.id)).unwrap();
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            } catch (error) {
                alert('Không thể xóa thanh toán: ' + error.message);
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
    };

    // Format số tiền
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Format ngày tháng (ngắn gọn cho bảng)
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    // Tính tổng amount
    const totalAmount = payments.reduce((sum, payment) => {
        return sum + (payment.amount || 0);
    }, 0);

    if (payments.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">Chưa có thanh toán nào.</p>
            </div>
        );
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Semester</th>
                        <th>Course</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.semester}</td>
                            <td>{payment.courseName}</td>
                            <td>
                                <Badge bg="success">
                                    {formatAmount(payment.amount)}
                                </Badge>
                            </td>
                            <td>{formatDate(payment.date)}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleViewDetails(payment)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(payment)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(payment)}
                                    disabled={isLoading}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-end mt-2">
                <strong>Total Amount: {formatAmount(totalAmount)}</strong>
            </div>
            <ConfirmModal
                show={showDeleteModal}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa thanh toán "${paymentToDelete?.courseName}" (${paymentToDelete?.semester})?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default PaymentTable;

