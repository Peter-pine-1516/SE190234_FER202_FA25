import React from 'react';
import { Card, Table, Spinner, Button } from 'react-bootstrap';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ExpenseTable = ({ expenses, isLoading, onEdit, onDelete, formatAmount }) => (
  <Card className="shadow-sm">
    <Card.Header as="h5">Expense Management</Card.Header>
    <Card.Body className="p-0">
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner animation="border" role="status" />
              </td>
            </tr>
          ) : expenses.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{formatAmount(expense.amount)}</td>
                <td>{expense.category}</td>
                <td>{formatDate(expense.date)}</td>
                <td className="text-end">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2 text-white"
                    onClick={() => onEdit(expense)}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(expense)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default ExpenseTable;


