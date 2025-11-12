import React, { useMemo, useState, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import ExpenseSummaryCard from '../components/ExpenseSummaryCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseFilter from '../components/ExpenseFilter';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseEditModal from '../components/ExpenseEditModal';
import ExpenseDeleteModal from '../components/ExpenseDeleteModal';
import { useExpenses } from '../contexts/ExpenseContext';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

const DashboardPage = () => {
  const { expenses, totalAmount, categories, isLoading, error, addExpense, updateExpense, deleteExpense } =
    useExpenses();

  const [filterCategory, setFilterCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'all') return expenses;
    return expenses.filter((expense) => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  const formatAmount = useCallback(
    (value) => currencyFormatter.format(Number(value) || 0),
    []
  );

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const handleAddExpense = async (payload) => {
    const created = await addExpense(payload);
    if (created) {
      showSuccess('Add expense successfully.');
      return true;
    }
    return false;
  };

  const handleSaveExpense = async (payload) => {
    const { id, ...rest } = payload;
    const updated = await updateExpense(id, rest);
    if (updated) {
      showSuccess('Update expense successfully.');
      return true;
    }
    return false;
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteExpense(deleteTarget.id);
      showSuccess('Delete expense successfully.');
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container className="pb-4">
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="gy-4">
          <Col lg={4}>
            <ExpenseSummaryCard totalAmount={formatAmount(totalAmount)} isLoading={isLoading} />
            <ExpenseForm
              onSubmit={handleAddExpense}
              isSubmitting={isLoading}
              categorySuggestions={categories}
            />
          </Col>

          <Col lg={8}>
            <ExpenseFilter
              categories={categories}
              value={filterCategory}
              onChange={setFilterCategory}
              onReset={() => setFilterCategory('all')}
              isDisabled={isLoading && expenses.length === 0}
            />
            <ExpenseTable
              expenses={filteredExpenses}
              isLoading={isLoading}
              onEdit={setEditingExpense}
              onDelete={setDeleteTarget}
              formatAmount={formatAmount}
            />
          </Col>
        </Row>
      </Container>

      <ExpenseEditModal
        show={Boolean(editingExpense)}
        expense={editingExpense}
        onHide={() => setEditingExpense(null)}
        onSave={handleSaveExpense}
        isSubmitting={isLoading}
      />

      <ExpenseDeleteModal
        show={Boolean(deleteTarget)}
        expense={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        isSubmitting={isLoading}
      />
    </>
  );
};

export default DashboardPage;
