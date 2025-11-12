import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

const ExpenseSummaryCard = ({ totalAmount, isLoading }) => (
  <Card className="shadow-sm mb-4">
    <Card.Header as="h5">Total of Expenses</Card.Header>
    <Card.Body>
      {isLoading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" role="status" size="sm" />
          <span>Calculating...</span>
        </div>
      ) : (
        <h2 className="fw-bold text-primary mb-0">{totalAmount}</h2>
      )}
    </Card.Body>
  </Card>
);

export default ExpenseSummaryCard;


