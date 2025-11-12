//ExpenseTable.jsx hiển thị danh sách expenses dưới dạng bảng
import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useExpense } from '../contexts/expensesContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const ExpenseTable = ({ filteredExpenses }) => {
    const { deleteExpense } = useExpense();
    const navigate = useNavigate();
    
    // Use filteredExpenses if provided, otherwise fallback to all expenses
    const expenses = filteredExpenses || [];
    
    // State for delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const handleViewDetails = (expense) => {
        navigate(`/expenses/${expense.id}`);
    };

    const handleEdit = (expense) => {
        navigate(`/expenses/${expense.id}/edit`);
    };

    const handleDeleteClick = (expense) => {
        setExpenseToDelete(expense);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (expenseToDelete) {
            try {
                await deleteExpense(expenseToDelete.id);
                setShowDeleteModal(false);
                setExpenseToDelete(null);
            } catch (error) {
                alert('Không thể xóa thanh toán: ' + error.message);
                setShowDeleteModal(false);
                setExpenseToDelete(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setExpenseToDelete(null);
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
    const totalAmount = expenses.reduce((sum, expense) => {
        return sum + (expense.amount || 0);
    }, 0);

    if (expenses.length === 0) {
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
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.semester}</td>
                            <td>{expense.courseName}</td>
                            <td>
                                <Badge bg="success">
                                    {formatAmount(expense.amount)}
                                </Badge>
                            </td>
                            <td>{formatDate(expense.date)}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleViewDetails(expense)}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(expense)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(expense)}
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
                message={`Bạn có chắc chắn muốn xóa thanh toán "${expenseToDelete?.courseName}" (${expenseToDelete?.semester})?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default ExpenseTable;

